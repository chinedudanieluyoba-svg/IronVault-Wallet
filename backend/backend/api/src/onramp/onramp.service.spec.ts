import { Test, TestingModule } from '@nestjs/testing';
import { OnRampService } from './onramp.service';
import { PrismaService } from '../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
import { AuditLogger } from '../common/logging/audit.logger';
import { RequestIdStorage } from '../common/logging/request-id.storage';
import { MetricsService } from '../common/metrics/metrics.service';
import { OnRampEvent } from './types/onramp-event';

describe('OnRampService', () => {
  let service: OnRampService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    $transaction: jest.fn(),
    webhookEvent: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    wallet: {
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    transaction: {
      create: jest.fn(),
    },
    onRamp: {
      create: jest.fn(),
    },
  };

  const mockAuditLogger = {
    audit: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  const mockRequestIdStorage = {
    getRequestId: jest.fn().mockReturnValue('req-123'),
    setRequestId: jest.fn(),
    setUserId: jest.fn(),
    getContext: jest.fn(),
  };

  const mockMetricsService = {
    trackWalletCredit: jest.fn(),
    trackWalletDebit: jest.fn(),
    trackWebhook: jest.fn(),
    trackError: jest.fn(),
    startTimer: jest.fn().mockReturnValue(() => 0),
  };

  const mockWalletService = {
    creditWallet: jest.fn().mockResolvedValue({
      id: 'wallet_1',
      userId: 'user_1',
      balance: 200,
      currency: 'USD',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnRampService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: WalletService, useValue: mockWalletService },
        { provide: AuditLogger, useValue: mockAuditLogger },
        { provide: RequestIdStorage, useValue: mockRequestIdStorage },
        { provide: MetricsService, useValue: mockMetricsService },
      ],
    }).compile();

    service = module.get<OnRampService>(OnRampService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('processEvent', () => {
    it('should ignore non-completed events', async () => {
      const event: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'tx_123',
        userId: 'user_1',
        amount: 100,
        currency: 'USD',
        status: 'pending',
        rawPayloadHash: 'hash123',
      };

      await service.processEvent(event, true);

      expect(mockPrismaService.$transaction).not.toHaveBeenCalled();
    });

    it('should process completed events in transaction', async () => {
      const event: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'tx_123',
        userId: 'user_1',
        amount: 100,
        currency: 'USD',
        status: 'completed',
        rawPayloadHash: 'hash123',
      };

      // Setup transaction mock
      mockPrismaService.$transaction.mockImplementation((cb) => {
        const mockTx = {
          webhookEvent: {
            findUnique: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({ id: 'we_1' }),
          },
          wallet: {
            findUniqueOrThrow: jest.fn().mockResolvedValue({ id: 'wallet_1' }),
            update: jest
              .fn()
              .mockResolvedValue({ id: 'wallet_1', balance: 100 }),
          },
          transaction: {
            create: jest.fn().mockResolvedValue({ id: 'txn_1' }),
          },
        };
        return cb(mockTx);
      });

      await service.processEvent(event, true);

      expect(mockPrismaService.$transaction).toHaveBeenCalled();
    });

    it('should check for idempotency before processing', async () => {
      const event: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'tx_duplicate',
        userId: 'user_1',
        amount: 100,
        currency: 'USD',
        status: 'completed',
        rawPayloadHash: 'hash_dup',
      };

      let capturedTx: any;

      mockPrismaService.$transaction.mockImplementation((cb) => {
        capturedTx = {
          webhookEvent: {
            findUnique: jest
              .fn()
              .mockResolvedValue({ id: 'we_1', externalId: 'tx_duplicate' }),
            create: jest.fn(),
          },
          wallet: {
            findUniqueOrThrow: jest.fn(),
            update: jest.fn(),
          },
          transaction: {
            create: jest.fn(),
          },
        };
        return cb(capturedTx);
      });

      await service.processEvent(event, true);

      // Verify idempotency check was called
      expect(capturedTx.webhookEvent.findUnique).toHaveBeenCalledWith({
        where: { externalId: 'tx_duplicate' },
      });

      // Verify wallet was not updated if duplicate exists
      expect(capturedTx.wallet.update).not.toHaveBeenCalled();
    });

    it('should atomically credit wallet on completion', async () => {
      const event: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'tx_credit',
        userId: 'user_2',
        amount: 250.5,
        currency: 'EUR',
        status: 'completed',
        rawPayloadHash: 'hash_credit',
      };

      let capturedTx: any;

      mockPrismaService.$transaction.mockImplementation((cb) => {
        capturedTx = {
          webhookEvent: {
            findUnique: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({ id: 'we_1' }),
          },
          wallet: {
            findUniqueOrThrow: jest
              .fn()
              .mockResolvedValue({ id: 'wallet_1', balance: 100 }),
            update: jest.fn().mockResolvedValue({
              id: 'wallet_1',
              balance: 350.5,
            }),
          },
          transaction: {
            create: jest.fn().mockResolvedValue({ id: 'txn_1' }),
          },
        };
        return cb(capturedTx);
      });

      await service.processEvent(event, true);

      // Verify WalletService.creditWallet was called with correct parameters
      expect(mockWalletService.creditWallet).toHaveBeenCalledWith({
        walletId: 'wallet_1',
        amount: 250.5,
        type: 'deposit',
        source: 'webhook',
        reference: expect.stringContaining('tx_credit'),
        description: expect.stringContaining('moonpay'),
        verifiedWebhook: true,
        providerEventId: 'tx_credit',
      });
    });

    it('should create transaction record for audit trail', async () => {
      const event: OnRampEvent = {
        provider: 'transak',
        externalId: 'tx_audit',
        userId: 'user_3',
        amount: 500,
        currency: 'USD',
        status: 'completed',
        rawPayloadHash: 'hash_audit',
      };

      let capturedTx: any;

      mockPrismaService.$transaction.mockImplementation((cb) => {
        capturedTx = {
          webhookEvent: {
            findUnique: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({ id: 'we_1' }),
          },
          wallet: {
            findUniqueOrThrow: jest
              .fn()
              .mockResolvedValue({ id: 'wallet_2', balance: 0 }),
            update: jest.fn().mockResolvedValue({
              id: 'wallet_2',
              balance: 500,
            }),
          },
          transaction: {
            create: jest.fn().mockResolvedValue({ id: 'txn_2' }),
          },
        };
        return cb(capturedTx);
      });

      await service.processEvent(event, true);

      // Verify WalletService.creditWallet was called (which creates transaction internally)
      expect(mockWalletService.creditWallet).toHaveBeenCalled();
    });

    it('should record webhook event for replay protection', async () => {
      const event: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'tx_webhook_record',
        userId: 'user_4',
        amount: 150,
        currency: 'GBP',
        status: 'completed',
        rawPayloadHash: 'hash_webhook_123',
      };

      let capturedTx: any;

      mockPrismaService.$transaction.mockImplementation((cb) => {
        capturedTx = {
          webhookEvent: {
            findUnique: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({ id: 'we_1' }),
          },
          wallet: {
            findUniqueOrThrow: jest
              .fn()
              .mockResolvedValue({ id: 'wallet_3', balance: 0 }),
            update: jest.fn().mockResolvedValue({
              id: 'wallet_3',
              balance: 150,
            }),
          },
          transaction: {
            create: jest.fn().mockResolvedValue({ id: 'txn_3' }),
          },
        };
        return cb(capturedTx);
      });

      await service.processEvent(event, true);

      // Verify webhook event was recorded with payload hash
      expect(capturedTx.webhookEvent.create).toHaveBeenCalledWith({
        data: {
          provider: 'moonpay',
          externalId: 'tx_webhook_record',
          payloadHash: 'hash_webhook_123',
          status: 'processed',
          processedAt: expect.any(Date),
        },
      });
    });

    it('should handle failed, pending, and refunded statuses', async () => {
      const statuses: Array<OnRampEvent['status']> = [
        'failed',
        'pending',
        'refunded',
      ];

      for (const status of statuses) {
        jest.clearAllMocks();

        const event: OnRampEvent = {
          provider: 'moonpay',
          externalId: `tx_${status}`,
          userId: 'user_5',
          amount: 100,
          currency: 'USD',
          status,
          rawPayloadHash: `hash_${status}`,
        };

        await service.processEvent(event, true);

        // Should not process transaction for these statuses
        expect(mockPrismaService.$transaction).not.toHaveBeenCalled();
      }
    });

    it('should support multi-provider events through normalized interface', async () => {
      const moonpayEvent: OnRampEvent = {
        provider: 'moonpay',
        externalId: 'mp_123',
        userId: 'user_mp',
        amount: 100,
        currency: 'USD',
        status: 'completed',
        rawPayloadHash: 'hash_mp',
      };

      const transakEvent: OnRampEvent = {
        provider: 'transak',
        externalId: 'transak_456',
        userId: 'user_transak',
        amount: 200,
        currency: 'EUR',
        status: 'completed',
        rawPayloadHash: 'hash_transak',
      };

      mockPrismaService.$transaction.mockImplementation((cb) => {
        const mockTx = {
          webhookEvent: {
            findUnique: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({ id: 'we_1' }),
          },
          wallet: {
            findUniqueOrThrow: jest
              .fn()
              .mockResolvedValue({ id: 'wallet_1', balance: 0 }),
            update: jest.fn().mockResolvedValue({ id: 'wallet_1' }),
          },
          transaction: {
            create: jest.fn().mockResolvedValue({ id: 'txn_1' }),
          },
        };
        return cb(mockTx);
      });

      await service.processEvent(moonpayEvent, true);
      await service.processEvent(transakEvent, true);

      expect(mockPrismaService.$transaction).toHaveBeenCalledTimes(2);
    });
  });
});

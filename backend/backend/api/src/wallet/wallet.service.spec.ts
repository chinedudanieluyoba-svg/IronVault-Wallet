import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { WalletLedgerService } from './services/wallet-ledger.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogger } from '../common/logging/audit.logger';
import { RequestIdStorage } from '../common/logging/request-id.storage';
import { MetricsService } from '../common/metrics/metrics.service';
import { IdempotencyService } from '../common/idempotency/idempotency.service';
import { ConcurrencyLockService } from '../common/concurrency/concurrency-lock.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('WalletService', () => {
  let service: WalletService;
  let ledgerService: WalletLedgerService;
  let prismaService: PrismaService;
  let idempotencyService: IdempotencyService;
  let concurrencyLockService: ConcurrencyLockService;

  const mockPrismaService = {
    wallet: {
      findUnique: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    walletLedgerEntry: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const mockLedgerService = {
    recordEntry: jest.fn(),
    getEntries: jest.fn(),
    getTotalCredits: jest.fn(),
    getTotalDebits: jest.fn(),
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

  const mockIdempotencyService = {
    generateKey: jest.fn(),
    generateWebhookKey: jest.fn(),
    checkIdempotency: jest.fn(),
  };

  const mockConcurrencyLockService = {
    lockWallet: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: WalletLedgerService, useValue: mockLedgerService },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: AuditLogger, useValue: mockAuditLogger },
        { provide: RequestIdStorage, useValue: mockRequestIdStorage },
        { provide: MetricsService, useValue: mockMetricsService },
        { provide: IdempotencyService, useValue: mockIdempotencyService },
        {
          provide: ConcurrencyLockService,
          useValue: mockConcurrencyLockService,
        },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
    ledgerService = module.get<WalletLedgerService>(WalletLedgerService);
    prismaService = module.get<PrismaService>(PrismaService);
    idempotencyService = module.get<IdempotencyService>(IdempotencyService);
    concurrencyLockService = module.get<ConcurrencyLockService>(
      ConcurrencyLockService,
    );
  });

  describe('createWallet', () => {
    it('should create wallet for new user', async () => {
      mockPrismaService.wallet.findFirst.mockResolvedValue(null);
      mockPrismaService.wallet.create.mockResolvedValue({
        id: 'wallet_1',
        userId: 'user_1',
        currency: 'USD',
        balance: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.createWallet({
        userId: 'user_1',
        currency: 'USD',
      });

      expect(result.id).toBe('wallet_1');
      expect(result.balance).toBe(0);
      expect(result.currency).toBe('USD');
    });

    it('should prevent duplicate wallet creation', async () => {
      mockPrismaService.wallet.findFirst.mockResolvedValue({
        id: 'wallet_existing',
        userId: 'user_1',
      });

      await expect(
        service.createWallet({
          userId: 'user_1',
          currency: 'USD',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getWallet', () => {
    it('should retrieve wallet by ID', async () => {
      mockPrismaService.wallet.findUnique.mockResolvedValue({
        id: 'wallet_1',
        userId: 'user_1',
        currency: 'USD',
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockLedgerService.getTotalCredits.mockResolvedValue(100);
      mockLedgerService.getTotalDebits.mockResolvedValue(0);

      const result = await service.getWallet('wallet_1');

      expect(result.id).toBe('wallet_1');
      expect(result.balance).toBe(100);
    });

    it('should throw if wallet not found', async () => {
      mockPrismaService.wallet.findUnique.mockResolvedValue(null);

      await expect(service.getWallet('wallet_notfound')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('creditWallet', () => {
    it('should credit wallet atomically with ledger entry', async () => {
      const walletBefore = {
        id: 'wallet_1',
        userId: 'user_1',
        balance: 100,
      };

      const walletAfter = {
        id: 'wallet_1',
        userId: 'user_1',
        balance: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock idempotency check (new operation)
      jest
        .spyOn(idempotencyService, 'generateWebhookKey')
        .mockReturnValue('webhook:provider_test:wallet_1:credit');
      jest
        .spyOn(idempotencyService, 'checkIdempotency')
        .mockResolvedValue({ isNew: true });

      // Mock concurrency lock
      jest
        .spyOn(concurrencyLockService, 'lockWallet')
        .mockResolvedValue(walletBefore as any);

      mockPrismaService.$transaction.mockImplementation((cb) => {
        const mockTx = {
          wallet: {
            update: jest.fn().mockResolvedValue(walletAfter),
          },
          walletLedgerEntry: {
            create: jest.fn().mockResolvedValue({
              id: 'entry_1',
              walletId: 'wallet_1',
              type: 'deposit',
              amount: 50,
              balanceBefore: 100,
              balanceAfter: 150,
            }),
          },
        };
        return cb(mockTx);
      });

      const result = await service.creditWallet({
        walletId: 'wallet_1',
        amount: 50,
        type: 'deposit',
        reference: 'onramp_tx_123',
        source: 'admin',
        actorRole: 'ADMIN',
        actorUserId: 'admin_1',
      });

      expect(result.balance).toBe(150);
      expect(mockPrismaService.$transaction).toHaveBeenCalled();
    });

    it('should reject invalid amounts', async () => {
      await expect(
        service.creditWallet({
          walletId: 'wallet_1',
          amount: -10,
          type: 'deposit',
          source: 'admin',
          actorRole: 'ADMIN',
          actorUserId: 'admin_1',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('debitWallet', () => {
    it('should debit wallet atomically with ledger entry', async () => {
      const walletBefore = {
        id: 'wallet_1',
        userId: 'user_1',
        balance: 100,
      };

      const walletAfter = {
        id: 'wallet_1',
        userId: 'user_1',
        balance: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock idempotency check (new operation)
      jest
        .spyOn(idempotencyService, 'generateKey')
        .mockReturnValue('user:withdraw_123:wallet_1:debit');
      jest
        .spyOn(idempotencyService, 'checkIdempotency')
        .mockResolvedValue({ isNew: true });

      // Mock concurrency lock
      jest
        .spyOn(concurrencyLockService, 'lockWallet')
        .mockResolvedValue(walletBefore as any);

      mockPrismaService.$transaction.mockImplementation((cb) => {
        const mockTx = {
          wallet: {
            update: jest.fn().mockResolvedValue(walletAfter),
          },
          walletLedgerEntry: {
            create: jest.fn().mockResolvedValue({
              id: 'entry_1',
              walletId: 'wallet_1',
              type: 'withdrawal',
              amount: 25,
              balanceBefore: 100,
              balanceAfter: 75,
            }),
          },
        };
        return cb(mockTx);
      });

      const result = await service.debitWallet({
        walletId: 'wallet_1',
        amount: 25,
        type: 'withdrawal',
        reference: 'withdraw_123',
        source: 'user',
        userId: 'user_1',
      });

      expect(result.balance).toBe(75);
    });

    it('should prevent debit if insufficient balance', async () => {
      const walletBefore = {
        id: 'wallet_1',
        userId: 'user_1',
        balance: 10,
      };

      // Mock idempotency check (new operation)
      jest
        .spyOn(idempotencyService, 'generateKey')
        .mockReturnValue('user:withdraw_large:wallet_1:debit');
      jest
        .spyOn(idempotencyService, 'checkIdempotency')
        .mockResolvedValue({ isNew: true });

      // Mock concurrency lock - returns wallet with insufficient balance
      jest
        .spyOn(concurrencyLockService, 'lockWallet')
        .mockResolvedValue(walletBefore as any);

      mockPrismaService.$transaction.mockImplementation((cb) => {
        const mockTx = {
          wallet: {
            update: jest.fn(),
          },
          walletLedgerEntry: {
            create: jest.fn(),
          },
        };
        return cb(mockTx);
      });

      await expect(
        service.debitWallet({
          walletId: 'wallet_1',
          amount: 50,
          type: 'withdrawal',
          source: 'user',
          userId: 'user_1',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('creditWallet - Idempotency', () => {
    it('should return existing wallet state for duplicate operation', async () => {
      const walletId = 'wallet_123';
      const amount = 100;
      const idempotencyKey = 'webhook:provider_tx_123:wallet_123:credit';

      const existingWallet = {
        id: walletId,
        userId: 'user_456',
        balance: 1000,
        currency: 'USD',
      };

      const existingEntry = {
        id: 'entry_123',
        walletId,
        idempotencyKey,
        amount,
      };

      jest
        .spyOn(idempotencyService, 'generateWebhookKey')
        .mockReturnValue(idempotencyKey);
      jest.spyOn(idempotencyService, 'checkIdempotency').mockResolvedValue({
        isNew: false,
        existingEntry,
      });
      jest
        .spyOn(prismaService.wallet, 'findUniqueOrThrow')
        .mockResolvedValue(existingWallet as any);

      const result = await service.creditWallet({
        walletId,
        amount,
        type: 'deposit',
        source: 'webhook',
        reference: 'provider_tx_123',
        verifiedWebhook: true,
        providerEventId: 'tx_123',
      });

      expect(result).toEqual(existingWallet);
      expect(service['auditLogger'].info).toHaveBeenCalledWith(
        expect.objectContaining({ walletId }),
        'Duplicate credit detected (idempotent)',
        expect.any(Object),
      );
    });

    it('should process new operation with idempotency key', async () => {
      const walletId = 'wallet_123';
      const amount = 100;
      const idempotencyKey = 'webhook:provider_tx_456:wallet_123:credit';

      const lockedWallet = {
        id: walletId,
        userId: 'user_456',
        balance: 1000,
        currency: 'USD',
      };

      const updatedWallet = { ...lockedWallet, balance: 1100 };

      jest
        .spyOn(idempotencyService, 'generateWebhookKey')
        .mockReturnValue(idempotencyKey);
      jest
        .spyOn(idempotencyService, 'checkIdempotency')
        .mockResolvedValue({ isNew: true });
      jest
        .spyOn(concurrencyLockService, 'lockWallet')
        .mockResolvedValue(lockedWallet as any);

      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation(async (callback: any) => {
          const tx = {
            wallet: { update: jest.fn().mockResolvedValue(updatedWallet) },
            walletLedgerEntry: {
              create: jest.fn().mockResolvedValue({ id: 'entry_456' }),
            },
          };
          return callback(tx);
        });

      const result = await service.creditWallet({
        walletId,
        amount,
        type: 'deposit',
        source: 'webhook',
        reference: 'provider_tx_456',
        verifiedWebhook: true,
        providerEventId: 'tx_456',
      });

      expect(result).toEqual(updatedWallet);
    });
  });

  describe('debitWallet - Idempotency', () => {
    it('should return existing wallet state for duplicate debit', async () => {
      const walletId = 'wallet_123';
      const amount = 50;
      const idempotencyKey = 'user:user_123_tx_789:wallet_123:debit';

      const existingWallet = {
        id: walletId,
        balance: 950,
      };

      jest
        .spyOn(idempotencyService, 'generateKey')
        .mockReturnValue(idempotencyKey);
      jest.spyOn(idempotencyService, 'checkIdempotency').mockResolvedValue({
        isNew: false,
        existingEntry: { id: 'entry_789' },
      });
      jest
        .spyOn(prismaService.wallet, 'findUniqueOrThrow')
        .mockResolvedValue(existingWallet as any);

      const result = await service.debitWallet({
        walletId,
        amount,
        type: 'withdrawal',
        source: 'user',
        reference: 'user_123_tx_789',
        userId: 'user_123',
      });

      expect(result).toEqual(existingWallet);
    });

    it('should prevent insufficient balance with row-level locking', async () => {
      const walletId = 'wallet_123';
      const amount = 200;

      jest
        .spyOn(idempotencyService, 'generateKey')
        .mockReturnValue('unique_debit_key');
      jest
        .spyOn(idempotencyService, 'checkIdempotency')
        .mockResolvedValue({ isNew: true });

      const lockedWallet = {
        id: walletId,
        userId: 'user_123',
        balance: 100,
      };

      jest
        .spyOn(concurrencyLockService, 'lockWallet')
        .mockResolvedValue(lockedWallet as any);

      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation(async (callback: any) => {
          const tx = {
            wallet: { update: jest.fn() },
            walletLedgerEntry: { create: jest.fn() },
          };
          return callback(tx);
        });

      await expect(
        service.debitWallet({
          walletId,
          amount,
          type: 'withdrawal',
          source: 'user',
          reference: 'tx_insufficient',
          userId: 'user_123',
        }),
      ).rejects.toThrow('Insufficient balance');
    });
  });
  describe('getBalance', () => {
    it('should return current balance', async () => {
      mockPrismaService.wallet.findUnique.mockResolvedValue({
        id: 'wallet_1',
        balance: 250,
        userId: 'user_1',
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockLedgerService.getTotalCredits.mockResolvedValue(250);
      mockLedgerService.getTotalDebits.mockResolvedValue(0);

      const balance = await service.getBalance('wallet_1');

      expect(balance).toBe(250);
    });
  });
});

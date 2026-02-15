import { Test } from '@nestjs/testing';
import { IdempotencyService } from './idempotency.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('IdempotencyService', () => {
  let service: IdempotencyService;
  let prisma: PrismaService;

  const mockPrisma = {
    walletLedgerEntry: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        IdempotencyService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<IdempotencyService>(IdempotencyService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('generateKey', () => {
    it('should generate idempotency key in correct format', () => {
      const key = service.generateKey(
        'webhook',
        'moonpay_tx_123',
        'wallet_456',
        'credit',
      );
      expect(key).toBe('webhook:moonpay_tx_123:wallet_456:credit');
    });

    it('should generate unique keys for different operations', () => {
      const key1 = service.generateKey(
        'webhook',
        'tx_123',
        'wallet_1',
        'credit',
      );
      const key2 = service.generateKey(
        'webhook',
        'tx_123',
        'wallet_1',
        'debit',
      );
      expect(key1).not.toBe(key2);
    });
  });

  describe('generateWebhookKey', () => {
    it('should generate webhook idempotency key', () => {
      const key = service.generateWebhookKey('moonpay', 'tx_123', 'wallet_456');
      expect(key).toBe('webhook:moonpay_tx_123:wallet_456:credit');
      expect(key).toContain('moonpay');
      expect(key).toContain('tx_123');
    });
  });

  describe('generateAdminKey', () => {
    it('should generate admin idempotency key', () => {
      const key = service.generateAdminKey(
        'admin_123',
        1707350400000,
        'wallet_456',
        'credit',
      );
      expect(key).toMatch(/^admin:admin_123_\d+:wallet_456:credit$/);
    });
  });

  describe('generateUserKey', () => {
    it('should generate user idempotency key', () => {
      const key = service.generateUserKey(
        'user_123',
        'tx_456',
        'wallet_789',
        'debit',
      );
      expect(key).toBe('user:user_123_tx_456:wallet_789:debit');
    });
  });

  describe('checkIdempotency', () => {
    it('should return isNew=false for existing entry', async () => {
      const existingEntry = {
        id: 'entry_123',
        walletId: 'wallet_456',
        idempotencyKey: 'webhook:moonpay_tx_123:wallet_456:credit',
      };

      mockPrisma.walletLedgerEntry.findUnique.mockResolvedValue(existingEntry);

      const result = await service.checkIdempotency(
        'webhook:moonpay_tx_123:wallet_456:credit',
      );

      expect(result.isNew).toBe(false);
      expect(result.existingEntry).toEqual(existingEntry);
    });

    it('should return isNew=true for new entry', async () => {
      mockPrisma.walletLedgerEntry.findUnique.mockResolvedValue(null);

      const result = await service.checkIdempotency(
        'webhook:new_tx:wallet_456:credit',
      );

      expect(result.isNew).toBe(true);
      expect(result.existingEntry).toBeUndefined();
    });
  });

  describe('isValidKey', () => {
    it('should validate correct key format', () => {
      expect(service.isValidKey('webhook:tx_123:wallet_456:credit')).toBe(true);
      expect(service.isValidKey('admin:admin_123:wallet_789:debit')).toBe(true);
      expect(service.isValidKey('user:user_123:wallet_000:credit')).toBe(true);
    });

    it('should reject invalid key formats', () => {
      expect(service.isValidKey('invalid')).toBe(false);
      expect(service.isValidKey('webhook:tx_123:credit')).toBe(false); // Missing walletId
      expect(service.isValidKey('invalid:tx:wallet:credit')).toBe(false); // Invalid source
      expect(service.isValidKey('webhook:tx:wallet:invalid')).toBe(false); // Invalid action
      expect(service.isValidKey('webhook::wallet:credit')).toBe(false); // Empty reference
    });
  });
});

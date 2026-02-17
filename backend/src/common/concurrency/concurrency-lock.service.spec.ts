import { Test } from '@nestjs/testing';
import { ConcurrencyLockService } from './concurrency-lock.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ConcurrencyLockService', () => {
  let service: ConcurrencyLockService;
  let prisma: PrismaService;

  const mockPrisma = {
    $queryRaw: jest.fn(),
    $executeRaw: jest.fn(),
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConcurrencyLockService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ConcurrencyLockService>(ConcurrencyLockService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('lockWallet', () => {
    it('should lock wallet and return wallet data', async () => {
      const mockWallet = {
        id: 'wallet_123',
        userId: 'user_456',
        balance: 1000,
        currency: 'USD',
      };

      mockPrisma.$queryRaw.mockResolvedValue([mockWallet]);

      const tx: any = { $queryRaw: mockPrisma.$queryRaw };
      const result = await service.lockWallet(tx, 'wallet_123');

      expect(result).toEqual(mockWallet);
      expect(mockPrisma.$queryRaw).toHaveBeenCalled();
      // Verify the query contains FOR UPDATE
      const callArgs = mockPrisma.$queryRaw.mock.calls[0];
      const query = callArgs[0].join
        ? callArgs[0].join('')
        : callArgs[0].toString();
      expect(query).toContain('FOR UPDATE');
    });

    it('should throw error if wallet not found', async () => {
      mockPrisma.$queryRaw.mockResolvedValue([]);
      const tx: any = { $queryRaw: mockPrisma.$queryRaw };

      await expect(service.lockWallet(tx, 'nonexistent')).rejects.toThrow(
        'Wallet nonexistent not found',
      );
    });
  });

  describe('lockWallets', () => {
    it('should lock multiple wallets in sorted order', async () => {
      const wallet1 = { id: 'wallet_1', balance: 100 };
      const wallet3 = { id: 'wallet_3', balance: 300 };

      // Mock returns wallets in order they're requested
      mockPrisma.$queryRaw
        .mockResolvedValueOnce([wallet1]) // First call for wallet_1 (sorted first)
        .mockResolvedValueOnce([wallet3]); // Second call for wallet_3

      const tx: any = { $queryRaw: mockPrisma.$queryRaw };
      const result = await service.lockWallets(tx, ['wallet_3', 'wallet_1']);

      // Result should be sorted by ID
      expect(result).toEqual([wallet1, wallet3]);
      expect(result).toHaveLength(2);
      expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(2);
    });

    it('should throw error if any wallet not found', async () => {
      mockPrisma.$queryRaw
        .mockResolvedValueOnce([{ id: 'wallet_1' }]) // First wallet found
        .mockResolvedValueOnce([]); // Second wallet not found
      const tx: any = { $queryRaw: mockPrisma.$queryRaw };

      await expect(
        service.lockWallets(tx, ['wallet_1', 'wallet_2']),
      ).rejects.toThrow('not found');
    });
  });

  describe('lockWalletWithTimeout', () => {
    it('should set lock_timeout before locking', async () => {
      const mockWallet = { id: 'wallet_123', balance: 1000 };
      mockPrisma.$executeRaw.mockResolvedValue(undefined); // SET lock_timeout
      mockPrisma.$queryRaw.mockResolvedValue([mockWallet]); // SELECT FOR UPDATE

      const tx: any = {
        $executeRaw: mockPrisma.$executeRaw,
        $queryRaw: mockPrisma.$queryRaw,
      };
      const result = await service.lockWalletWithTimeout(
        tx,
        'wallet_123',
        3000,
      );

      expect(result).toEqual(mockWallet);
      expect(mockPrisma.$executeRaw).toHaveBeenCalled();
      expect(mockPrisma.$queryRaw).toHaveBeenCalled();
    });

    it('should throw timeout error after timeout', async () => {
      const timeoutError = new Error('lock timeout exceeded');
      mockPrisma.$executeRaw.mockResolvedValue(undefined);
      mockPrisma.$queryRaw.mockRejectedValue(timeoutError);

      const tx: any = {
        $executeRaw: mockPrisma.$executeRaw,
        $queryRaw: mockPrisma.$queryRaw,
      };

      await expect(
        service.lockWalletWithTimeout(tx, 'wallet_123', 1000),
      ).rejects.toThrow('Failed to acquire lock');
    });
  });

  describe('isWalletLocked', () => {
    it('should return true if wallet is locked', async () => {
      mockPrisma.$queryRaw.mockResolvedValue([{ locked: true }]);

      const result = await service.isWalletLocked('wallet_123');

      expect(result).toBe(true);
      expect(mockPrisma.$queryRaw).toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('pg_locks')]),
      );
    });

    it('should return false if wallet is not locked', async () => {
      mockPrisma.$queryRaw.mockResolvedValue([]);

      const result = await service.isWalletLocked('wallet_123');

      expect(result).toBe(false);
    });
  });
});

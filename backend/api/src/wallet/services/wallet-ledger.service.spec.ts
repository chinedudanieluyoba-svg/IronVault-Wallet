import { Test, TestingModule } from '@nestjs/testing';
import { WalletLedgerService } from './wallet-ledger.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('WalletLedgerService', () => {
  let service: WalletLedgerService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    walletLedgerEntry: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      aggregate: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletLedgerService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<WalletLedgerService>(WalletLedgerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('recordEntry', () => {
    it('should record immutable ledger entry', async () => {
      mockPrismaService.walletLedgerEntry.create.mockResolvedValue({
        id: 'entry_1',
        walletId: 'wallet_1',
        type: 'deposit',
        amount: 100,
        balanceBefore: 0,
        balanceAfter: 100,
        reference: 'onramp_123',
        description: 'MoonPay deposit',
        createdAt: new Date(),
      });

      const result = await service.recordEntry(
        'wallet_1',
        'deposit',
        100,
        0,
        100,
        'onramp_123',
        'MoonPay deposit',
      );

      expect(result.id).toBe('entry_1');
      expect(result.type).toBe('deposit');
      expect(result.amount).toBe(100);
      expect(result.balanceAfter).toBe(100);
    });
  });

  describe('getEntries', () => {
    it('should retrieve entries ordered by creation time', async () => {
      mockPrismaService.walletLedgerEntry.findMany.mockResolvedValue([
        {
          id: 'entry_2',
          walletId: 'wallet_1',
          type: 'withdrawal',
          amount: 50,
          balanceBefore: 100,
          balanceAfter: 50,
          createdAt: new Date('2026-02-06T10:00:00Z'),
        },
        {
          id: 'entry_1',
          walletId: 'wallet_1',
          type: 'deposit',
          amount: 100,
          balanceBefore: 0,
          balanceAfter: 100,
          createdAt: new Date('2026-02-06T09:00:00Z'),
        },
      ]);

      const result = await service.getEntries('wallet_1', 50, 0);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('entry_2'); // Newest first
      expect(mockPrismaService.walletLedgerEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { walletId: 'wallet_1' },
          orderBy: { createdAt: 'desc' },
          take: 50,
          skip: 0,
        }),
      );
    });

    it('should support pagination', async () => {
      mockPrismaService.walletLedgerEntry.findMany.mockResolvedValue([]);

      await service.getEntries('wallet_1', 25, 100);

      expect(mockPrismaService.walletLedgerEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 25,
          skip: 100,
        }),
      );
    });
  });

  describe('getEntriesByType', () => {
    it('should filter entries by type', async () => {
      mockPrismaService.walletLedgerEntry.findMany.mockResolvedValue([
        {
          id: 'deposit_1',
          type: 'deposit',
          amount: 100,
        },
        {
          id: 'deposit_2',
          type: 'deposit',
          amount: 200,
        },
      ]);

      const result = await service.getEntriesByType('wallet_1', 'deposit', 50);

      expect(result).toHaveLength(2);
      expect(mockPrismaService.walletLedgerEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            walletId: 'wallet_1',
            type: 'deposit',
          },
        }),
      );
    });
  });

  describe('getEntryCount', () => {
    it('should return total entry count for wallet', async () => {
      mockPrismaService.walletLedgerEntry.count.mockResolvedValue(42);

      const count = await service.getEntryCount('wallet_1');

      expect(count).toBe(42);
    });
  });

  describe('getTotalDebits', () => {
    it('should sum all outgoing transactions', async () => {
      mockPrismaService.walletLedgerEntry.aggregate.mockResolvedValue({
        _sum: {
          amount: 350,
        },
      });

      const total = await service.getTotalDebits('wallet_1');

      expect(total).toBe(350);
      expect(
        mockPrismaService.walletLedgerEntry.aggregate,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            walletId: 'wallet_1',
            type: {
              in: ['withdrawal', 'transfer_out', 'trading'],
            },
          },
        }),
      );
    });

    it('should return 0 if no debits', async () => {
      mockPrismaService.walletLedgerEntry.aggregate.mockResolvedValue({
        _sum: {
          amount: null,
        },
      });

      const total = await service.getTotalDebits('wallet_1');

      expect(total).toBe(0);
    });
  });

  describe('getTotalCredits', () => {
    it('should sum all incoming transactions', async () => {
      mockPrismaService.walletLedgerEntry.aggregate.mockResolvedValue({
        _sum: {
          amount: 1000,
        },
      });

      const total = await service.getTotalCredits('wallet_1');

      expect(total).toBe(1000);
      expect(
        mockPrismaService.walletLedgerEntry.aggregate,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            walletId: 'wallet_1',
            type: {
              in: ['deposit', 'transfer_in'],
            },
          },
        }),
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletLedgerService } from './services/wallet-ledger.service';
import { ForbiddenException } from '@nestjs/common';

describe('WalletController', () => {
  let controller: WalletController;
  let walletService: WalletService;
  let ledgerService: WalletLedgerService;

  const mockWalletService = {
    createWallet: jest.fn(),
    getWallet: jest.fn(),
    getWalletByUserId: jest.fn(),
    getBalance: jest.fn(),
    creditWallet: jest.fn(),
    debitWallet: jest.fn(),
  };

  const mockLedgerService = {
    getEntries: jest.fn(),
    getEntryCount: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        { provide: WalletService, useValue: mockWalletService },
        { provide: WalletLedgerService, useValue: mockLedgerService },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    walletService = module.get<WalletService>(WalletService);
    ledgerService = module.get<WalletLedgerService>(WalletLedgerService);
  });

  describe('POST /wallets/create', () => {
    it('should create wallet for authenticated user', async () => {
      const req = { user: { userId: 'user_1' } };
      const input = { userId: 'user_1', currency: 'USD' };

      mockWalletService.createWallet.mockResolvedValue({
        id: 'wallet_1',
        userId: 'user_1',
        balance: 0,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await controller.createWallet(req, input);

      expect(result.id).toBe('wallet_1');
      expect(mockWalletService.createWallet).toHaveBeenCalledWith(input);
    });

    it('should prevent user from creating wallet for another user', async () => {
      const req = { user: { userId: 'user_1' } };
      const input = { userId: 'user_2', currency: 'USD' };

      await expect(controller.createWallet(req, input)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('GET /wallets/:id', () => {
    it('should return wallet by ID', async () => {
      const req = { user: { userId: 'user_1', role: 'USER' } };

      mockWalletService.getWallet.mockResolvedValue({
        id: 'wallet_1',
        userId: 'user_1',
        balance: 100,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await controller.getWallet('wallet_1', req);

      expect(result.id).toBe('wallet_1');
      expect(result.balance).toBe(100);
    });
  });

  describe('GET /wallets/:id/balance', () => {
    it('should return wallet balance', async () => {
      const req = { user: { userId: 'user_1', role: 'USER' } };

      mockWalletService.getWallet.mockResolvedValue({
        id: 'wallet_1',
        userId: 'user_1',
        balance: 250,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockWalletService.getBalance.mockResolvedValue(250);

      const result = await controller.getBalance('wallet_1', req);

      expect(result.balance).toBe(250);
    });
  });

  describe('GET /wallets/:id/ledger', () => {
    it('should return ledger entries with pagination', async () => {
      const req = { query: { limit: '10', offset: '0' } };

      mockLedgerService.getEntries.mockResolvedValue([
        {
          id: 'entry_1',
          walletId: 'wallet_1',
          type: 'deposit',
          amount: 100,
          balanceBefore: 0,
          balanceAfter: 100,
          reference: 'onramp_123',
          description: 'MoonPay deposit',
          createdAt: new Date(),
        },
      ]);

      mockLedgerService.getEntryCount.mockResolvedValue(1);

      const result = await controller.getLedger('wallet_1', req);

      expect(result.entries).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.entries[0].type).toBe('deposit');
    });

    it('should limit maximum entries to 100', async () => {
      const req = { query: { limit: '1000', offset: '0' } };

      mockLedgerService.getEntries.mockResolvedValue([]);
      mockLedgerService.getEntryCount.mockResolvedValue(0);

      await controller.getLedger('wallet_1', req);

      // Second argument should be 100 (capped)
      expect(mockLedgerService.getEntries).toHaveBeenCalledWith(
        'wallet_1',
        100,
        0,
      );
    });
  });

  describe('POST /wallets/credit', () => {
    it('should credit wallet with ledger entry', async () => {
      const req = { user: { userId: 'admin_1', role: 'ADMIN' } };
      const input = {
        walletId: 'wallet_1',
        amount: 50,
        type: 'deposit' as const,
        reference: 'onramp_tx_123',
      };

      mockWalletService.creditWallet.mockResolvedValue({
        id: 'wallet_1',
        userId: 'user_1',
        balance: 150,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await controller.creditWallet(input, req);

      expect(result.balance).toBe(150);
      expect(mockWalletService.creditWallet).toHaveBeenCalledWith({
        ...input,
        source: 'admin',
        actorRole: 'ADMIN',
        actorUserId: 'admin_1',
      });
    });
  });

  describe('POST /wallets/debit', () => {
    it('should debit wallet with ledger entry', async () => {
      const req = { user: { userId: 'user_1', role: 'USER' } };
      const input = {
        walletId: 'wallet_1',
        amount: 25,
        type: 'withdrawal' as const,
        reference: 'withdraw_456',
      };

      mockWalletService.debitWallet.mockResolvedValue({
        id: 'wallet_1',
        userId: 'user_1',
        balance: 75,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await controller.debitWallet(input, req);

      expect(result.balance).toBe(75);
      expect(mockWalletService.debitWallet).toHaveBeenCalledWith({
        ...input,
        source: 'user',
        userId: 'user_1',
      });
    });
  });

  describe('GET /wallets/me', () => {
    it('should return authenticated user wallet', async () => {
      const req = { user: { userId: 'user_1' } };

      mockWalletService.getWalletByUserId.mockResolvedValue({
        id: 'wallet_1',
        userId: 'user_1',
        balance: 500,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await controller.getMyWallet(req);

      expect(result.userId).toBe('user_1');
      expect(result.balance).toBe(500);
    });
  });
});

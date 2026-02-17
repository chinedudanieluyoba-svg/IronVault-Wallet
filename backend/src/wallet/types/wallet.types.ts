export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LedgerEntryType =
  | 'deposit'
  | 'withdrawal'
  | 'transfer_in'
  | 'transfer_out'
  | 'trading';

export type CreditSource = 'admin' | 'webhook';
export type DebitSource = 'user';

export interface WalletLedgerEntry {
  id: string;
  walletId: string;
  type: LedgerEntryType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  reference?: string;
  description?: string;
  createdAt: Date;
}

export interface CreateWalletInput {
  userId: string;
  currency: string;
}

export interface CreditWalletInput {
  walletId: string;
  amount: number;
  type: LedgerEntryType;
  reference?: string;
  description?: string;
  source: CreditSource;
  actorRole?: 'ADMIN' | 'USER';
  actorUserId?: string;
  verifiedWebhook?: boolean;
  providerEventId?: string;
}

export interface DebitWalletInput {
  walletId: string;
  amount: number;
  type: LedgerEntryType;
  reference?: string;
  description?: string;
  source: DebitSource;
  userId: string;
}

export interface WalletResponse {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LedgerEntryResponse {
  id: string;
  walletId: string;
  type: LedgerEntryType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  reference?: string;
  description?: string;
  createdAt: Date;
}

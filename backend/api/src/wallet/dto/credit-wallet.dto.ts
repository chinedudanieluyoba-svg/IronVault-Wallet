import { validateAmount } from '../../common/validators/amount.validator';

export type LedgerEntryType =
  | 'deposit'
  | 'withdrawal'
  | 'transfer_in'
  | 'transfer_out'
  | 'trading';

export class CreditWalletDto {
  walletId: string;
  amount: number;
  type: LedgerEntryType;
  reference?: string;
  description?: string;

  constructor(data: any) {
    if (!data.walletId || typeof data.walletId !== 'string') {
      throw new Error('walletId is required and must be a string');
    }

    const amountValidation = validateAmount(data.amount);
    if (!amountValidation.isValid) {
      throw new Error(amountValidation.error);
    }

    const validTypes: LedgerEntryType[] = [
      'deposit',
      'withdrawal',
      'transfer_in',
      'transfer_out',
      'trading',
    ];
    if (!data.type || !validTypes.includes(data.type)) {
      throw new Error(`type must be one of: ${validTypes.join(', ')}`);
    }

    this.walletId = data.walletId;
    this.amount = amountValidation.normalizedAmount!;
    this.type = data.type;
    this.reference = data.reference;
    this.description = data.description;
  }
}

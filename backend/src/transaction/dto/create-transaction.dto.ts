import { validateAmount } from '../../common/validators/amount.validator';

export type TransactionType = 'withdraw' | 'buy' | 'sell';

export class CreateTransactionDto {
  walletId: string;
  type: TransactionType;
  amount: number;
  idempotencyKey?: string;

  constructor(data: any) {
    if (!data.walletId || typeof data.walletId !== 'string') {
      throw new Error('walletId is required and must be a string');
    }

    const validTypes: TransactionType[] = ['withdraw', 'buy', 'sell'];
    if (!data.type || !validTypes.includes(data.type)) {
      throw new Error(`type must be one of: ${validTypes.join(', ')}`);
    }

    const amountValidation = validateAmount(data.amount);
    if (!amountValidation.isValid) {
      throw new Error(amountValidation.error);
    }

    if (data.idempotencyKey && typeof data.idempotencyKey !== 'string') {
      throw new Error('idempotencyKey must be a string if provided');
    }

    this.walletId = data.walletId;
    this.type = data.type;
    this.amount = amountValidation.normalizedAmount!;
    this.idempotencyKey = data.idempotencyKey;
  }
}

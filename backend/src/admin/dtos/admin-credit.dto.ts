import { validateAmount } from '../../common/validators/amount.validator';

/**
 * Manual admin credit (EMERGENCY ONLY)
 * Strictly controlled with validation:
 * - amount: must be > 0
 * - reason: must be 10-500 characters (for proper audit trail)
 */
export class AdminCreditDto {
  amount: number;
  reason: string;

  constructor(data: any) {
    if (typeof data?.amount !== 'number') {
      throw new Error('amount must be a number');
    }

    const amountValidation = validateAmount(data.amount);
    if (!amountValidation.isValid) {
      throw new Error(amountValidation.error);
    }

    if (typeof data?.reason !== 'string') {
      throw new Error('reason must be a string');
    }

    if (data.reason.length < 10) {
      throw new Error(
        'reason must be at least 10 characters (for proper audit trail)',
      );
    }

    if (data.reason.length > 500) {
      throw new Error('reason too long (max 500 characters)');
    }

    this.amount = data.amount;
    this.reason = data.reason;
  }
}

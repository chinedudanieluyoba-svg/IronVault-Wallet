import { validateAmount } from '../../common/validators/amount.validator';
import { Currency, isValidCurrency } from '../../common/enums/currency.enum';

export type OnRampProvider = 'moonpay' | 'transak' | 'paystack' | 'stripe';

export class InitiateOnRampDto {
  amount: number;
  currency: Currency;
  provider: OnRampProvider;

  constructor(data: any) {
    const amountValidation = validateAmount(data.amount);
    if (!amountValidation.isValid) {
      throw new Error(amountValidation.error);
    }

    if (!data.currency || !isValidCurrency(data.currency)) {
      throw new Error(
        `currency must be one of: ${Object.values(Currency).join(', ')}`,
      );
    }

    const validProviders: OnRampProvider[] = [
      'moonpay',
      'transak',
      'paystack',
      'stripe',
    ];
    if (!data.provider || !validProviders.includes(data.provider)) {
      throw new Error(`provider must be one of: ${validProviders.join(', ')}`);
    }

    this.amount = amountValidation.normalizedAmount!;
    this.currency = data.currency;
    this.provider = data.provider;
  }
}

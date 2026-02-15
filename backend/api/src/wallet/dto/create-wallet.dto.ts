import { Currency, isValidCurrency } from '../../common/enums/currency.enum';

export class CreateWalletDto {
  userId: string;
  currency: Currency;

  constructor(data: any) {
    if (!data.userId || typeof data.userId !== 'string') {
      throw new Error('userId is required and must be a string');
    }

    if (!data.currency || !isValidCurrency(data.currency)) {
      throw new Error(
        `currency must be one of: ${Object.values(Currency).join(', ')}`,
      );
    }

    this.userId = data.userId;
    this.currency = data.currency;
  }
}

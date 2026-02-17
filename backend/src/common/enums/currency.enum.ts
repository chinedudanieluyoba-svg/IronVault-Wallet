export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
}

export const isValidCurrency = (value: any): value is Currency => {
  return Object.values(Currency).includes(value);
};

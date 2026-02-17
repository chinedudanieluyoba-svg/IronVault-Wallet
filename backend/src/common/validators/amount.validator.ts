/**
 * Amount Validator
 * Ensures money amounts are always:
 * - Greater than 0
 * - Integers or valid decimal (2 decimals max)
 * - Never floating point errors
 */

export interface AmountValidationResult {
  isValid: boolean;
  error?: string;
  normalizedAmount?: number;
}

export function validateAmount(amount: any): AmountValidationResult {
  // Must be a number
  if (typeof amount !== 'number') {
    return {
      isValid: false,
      error: 'Amount must be a number',
    };
  }

  // Must be greater than 0
  if (amount <= 0) {
    return {
      isValid: false,
      error: 'Amount must be greater than 0',
    };
  }

  // Must be finite
  if (!isFinite(amount)) {
    return {
      isValid: false,
      error: 'Amount must be a finite number',
    };
  }

  // Must not have more than 2 decimal places (cents)
  const decimalPlaces = (amount.toString().split('.')[1] || '').length;
  if (decimalPlaces > 2) {
    return {
      isValid: false,
      error: 'Amount must not have more than 2 decimal places',
    };
  }

  // Normalize to prevent floating point errors
  const normalizedAmount = Math.round(amount * 100) / 100;

  return {
    isValid: true,
    normalizedAmount,
  };
}

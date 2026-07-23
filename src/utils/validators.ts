import { getExpectedCardLengths, passesLuhnCheck } from './cardValidators';

export type Validator = (value: string) => string | undefined;

export const required =
  (message = 'This field is required'): Validator =>
  (value) =>
    value?.trim() ? undefined : message;

export const isEmail =
  (message = 'Enter a valid email address'): Validator =>
  (value) => {
    if (!value) return undefined;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : message;
  };

export const isNumeric =
  (message = 'Must be a number'): Validator =>
  (value) => {
    if (!value) return undefined;
    return /^\d+$/.test(value) ? undefined : message;
  };

export const numberRange =
  (min: number, max: number, message = `Must be between ${min} and ${max}`): Validator =>
  (value) => {
    if (!value) return undefined;
    const num = Number(value);
    if (Number.isNaN(num)) return message;
    return num >= min && num <= max ? undefined : message;
  };

/**
 * Validates card number length against the detected card network, then
 * runs the Luhn checksum to catch mistyped/transposed digits. This is
 * standard front-end validation used before submitting to a real payment
 * processor — it cannot confirm the card is real, active, or has funds.
 */
export const isCardNumber =
  (message?: string): Validator =>
  (value) => {
    if (!value) return undefined;
    const digitsOnly = value.replace(/\s/g, '');
    if (!/^\d+$/.test(digitsOnly)) return message ?? 'Card number must contain only digits';

    const expectedLengths = getExpectedCardLengths(digitsOnly);
    if (!expectedLengths.includes(digitsOnly.length)) {
      return message ?? 'Enter a valid card number';
    }

    return passesLuhnCheck(digitsOnly) ? undefined : (message ?? 'Card number is invalid');
  };

export const isExpiryDate =
  (message = 'Enter a valid expiry date (MM/YY)'): Validator =>
  (value) => {
    if (!value) return undefined;
    const match = /^(\d{2})\/(\d{2})$/.exec(value);
    if (!match) return message;

    const month = Number(match[1]);
    if (month < 1 || month > 12) return message;

    const year = 2000 + Number(match[2]);
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const expiryMonthStart = new Date(year, month - 1, 1);

    return expiryMonthStart < currentMonthStart ? 'Card has expired' : undefined;
  };

export const isCvv =
  (expectedLength = 3, message?: string): Validator =>
  (value) => {
    if (!value) return undefined;
    return /^\d+$/.test(value) && value.length === expectedLength
      ? undefined
      : (message ?? `CVV must be ${expectedLength} digits`);
  };

export function composeValidators(...validators: Validator[]): Validator {
  return (value) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return undefined;
  };
}

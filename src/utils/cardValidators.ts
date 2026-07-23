export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

interface CardBrandRule {
  brand: CardBrand;
  pattern: RegExp;
  lengths: number[];
  cvvLength: number;
}

const CARD_BRAND_RULES: CardBrandRule[] = [
  { brand: 'amex', pattern: /^3[47]/, lengths: [15], cvvLength: 4 },
  { brand: 'visa', pattern: /^4/, lengths: [13, 16, 19], cvvLength: 3 },
  { brand: 'mastercard', pattern: /^(5[1-5]|2[2-7])/, lengths: [16], cvvLength: 3 },
  { brand: 'discover', pattern: /^6(?:011|5)/, lengths: [16], cvvLength: 3 },
];

function stripNonDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function detectCardBrand(cardNumber: string): CardBrand {
  const digits = stripNonDigits(cardNumber);
  return CARD_BRAND_RULES.find((rule) => rule.pattern.test(digits))?.brand ?? 'unknown';
}

export function getExpectedCardLengths(cardNumber: string): number[] {
  const digits = stripNonDigits(cardNumber);
  const rule = CARD_BRAND_RULES.find((entry) => entry.pattern.test(digits));
  return rule?.lengths ?? [13, 14, 15, 16, 19];
}

export function getExpectedCvvLength(cardNumber: string): number {
  const digits = stripNonDigits(cardNumber);
  return CARD_BRAND_RULES.find((rule) => rule.pattern.test(digits))?.cvvLength ?? 3;
}

/**
 * Luhn (mod 10) checksum — the algorithm card networks use to catch
 * transposed/mistyped digits. Does not confirm the card is real or active.
 */
export function passesLuhnCheck(cardNumber: string): boolean {
  const digits = stripNonDigits(cardNumber);
  if (!digits) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

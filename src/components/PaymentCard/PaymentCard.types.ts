import type { PaymentData } from '../../types/onboarding.types';

export interface PaymentCardProps {
  value: PaymentData;
  onChange: (field: keyof PaymentData, value: string) => void;
  onBlur?: (field: keyof PaymentData) => void;
  errors?: Partial<Record<keyof PaymentData, string>>;
}

import type { PaymentData } from '../../types/onboarding.types';

export interface PaymentCardProps {
  value: PaymentData;
  onChange: (field: keyof PaymentData, value: string) => void;
}

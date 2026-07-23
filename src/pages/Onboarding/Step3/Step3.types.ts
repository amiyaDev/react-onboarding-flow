import type { PaymentData } from '../../../types/onboarding.types';

export interface Step3Props {
  data: PaymentData;
  onChange: (field: keyof PaymentData, value: string) => void;
  onFinish?: () => void;
  onPrevious?: () => void;
}

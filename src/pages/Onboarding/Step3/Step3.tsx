import { useMemo } from 'react';
import OnboardingLayout from '../../../layouts/OnboardingLayout';
import PaymentCard from '../../../components/PaymentCard';
import { useFormValidation, type ValidationSchema } from '../../../hooks/useFormValidation';
import { composeValidators, isCardNumber, isCvv, isExpiryDate, required } from '../../../utils/validators';
import { getExpectedCvvLength } from '../../../utils/cardValidators';
import { ONBOARDING_STEPS } from '../onboardingSteps';
import type { Step3Props } from './Step3.types';
import type { PaymentData } from '../../../types/onboarding.types';

const Step3 = ({ data, onChange, onFinish, onPrevious }: Step3Props) => {
  const validationSchema = useMemo<ValidationSchema<PaymentData>>(() => {
    const cvvLength = getExpectedCvvLength(data.cardNumber);
    return {
      cardholderName: composeValidators(required('Cardholder name is required')),
      cardNumber: composeValidators(required('Card number is required'), isCardNumber()),
      expiryDate: composeValidators(required('Expiry date is required'), isExpiryDate()),
      cvv: composeValidators(required('CVV is required'), isCvv(cvvLength)),
    };
  }, [data.cardNumber]);

  const { handleBlur, validateAll, getError } = useFormValidation(validationSchema);

  const handleFinish = () => {
    const isValid = validateAll(data);
    if (isValid) {
      onFinish?.();
    }
  };

  return (
    <OnboardingLayout
      steps={ONBOARDING_STEPS}
      activeStep={2}
      title="Payment Information"
      subtitle="Add your payment details to finish setting up your account."
      onPrevious={onPrevious}
      onNext={handleFinish}
      nextLabel="Finish"
    >
      <PaymentCard
        value={data}
        onChange={onChange}
        onBlur={(field) => handleBlur(field, data[field])}
        errors={{
          cardholderName: getError('cardholderName'),
          cardNumber: getError('cardNumber'),
          expiryDate: getError('expiryDate'),
          cvv: getError('cvv'),
        }}
      />
    </OnboardingLayout>
  );
};

export default Step3;

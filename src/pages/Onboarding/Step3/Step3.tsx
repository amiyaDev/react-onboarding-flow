import OnboardingLayout from '../../../layouts/OnboardingLayout';
import PaymentCard from '../../../components/PaymentCard';
import { ONBOARDING_STEPS } from '../onboardingSteps';
import type { Step3Props } from './Step3.types';

const Step3 = ({ data, onChange, onFinish, onPrevious }: Step3Props) => {
  return (
    <OnboardingLayout
      steps={ONBOARDING_STEPS}
      activeStep={2}
      title="Payment Information"
      subtitle="Add your payment details to finish setting up your account."
      onPrevious={onPrevious}
      onNext={onFinish}
      nextLabel="Finish"
    >
      <PaymentCard value={data} onChange={onChange} />
    </OnboardingLayout>
  );
};

export default Step3;

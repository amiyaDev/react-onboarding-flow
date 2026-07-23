import { Stack } from '@mui/material';
import OnboardingLayout from '../../../layouts/OnboardingLayout';
import ProfileImageUpload from '../../../components/ProfileImageUpload';
import Input from '../../../components/ui/Input';
import { ONBOARDING_STEPS } from '../onboardingSteps';
import type { Step1Props } from './Step1.types';

const Step1 = ({ data, onChange, onImageChange, onNext, onPrevious, showPrevious = false }: Step1Props) => {
  return (
    <OnboardingLayout
      steps={ONBOARDING_STEPS}
      activeStep={0}
      title="Personal Profile"
      subtitle="Tell us a little about yourself to get started."
      onPrevious={onPrevious}
      onNext={onNext}
      showPrevious={showPrevious}
    >
      <Stack spacing={3}>
        <ProfileImageUpload imageUrl={data.profileImageUrl} onImageChange={onImageChange} />

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
        <Input
          label="Age"
          placeholder="Enter your age"
          type="number"
          value={data.age}
          onChange={(e) => onChange('age', e.target.value)}
        />
        <Input
          label="Email"
          placeholder="Enter your email address"
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </Stack>
    </OnboardingLayout>
  );
};

export default Step1;

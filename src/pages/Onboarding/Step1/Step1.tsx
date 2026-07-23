import { Stack } from '@mui/material';
import OnboardingLayout from '../../../layouts/OnboardingLayout';
import ProfileImageUpload from '../../../components/ProfileImageUpload';
import FormTextField from '../../../components/form/FormTextField';
import { useFormValidation, type ValidationSchema } from '../../../hooks/useFormValidation';
import { composeValidators, isEmail, isNumeric, numberRange, required } from '../../../utils/validators';
import { ONBOARDING_STEPS } from '../onboardingSteps';
import type { Step1Props } from './Step1.types';
import type { PersonalProfileData } from '../../../types/onboarding.types';

const validationSchema: ValidationSchema<Pick<PersonalProfileData, 'fullName' | 'age' | 'email'>> = {
  fullName: composeValidators(required('Full name is required')),
  age: composeValidators(required('Age is required'), isNumeric('Age must be a number'), numberRange(1, 120)),
  email: composeValidators(required('Email is required'), isEmail()),
};

const Step1 = ({ data, onChange, onImageChange, onNext, onPrevious, showPrevious = false }: Step1Props) => {
  const { handleBlur, validateAll, getError } = useFormValidation(validationSchema);

  const handleNext = () => {
    const isValid = validateAll({ fullName: data.fullName, age: data.age, email: data.email });
    if (isValid) {
      onNext?.();
    }
  };

  return (
    <OnboardingLayout
      steps={ONBOARDING_STEPS}
      activeStep={0}
      title="Personal Profile"
      subtitle="Tell us a little about yourself to get started."
      onPrevious={onPrevious}
      onNext={handleNext}
      showPrevious={showPrevious}
    >
      <Stack spacing={3}>
        <ProfileImageUpload imageUrl={data.profileImageUrl} onImageChange={onImageChange} />

        <FormTextField
          label="Full Name"
          placeholder="Enter your full name"
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          onBlur={() => handleBlur('fullName', data.fullName)}
          error={getError('fullName')}
        />
        <FormTextField
          label="Age"
          placeholder="Enter your age"
          type="number"
          value={data.age}
          onChange={(e) => onChange('age', e.target.value)}
          onBlur={() => handleBlur('age', data.age)}
          error={getError('age')}
        />
        <FormTextField
          label="Email"
          placeholder="Enter your email address"
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => handleBlur('email', data.email)}
          error={getError('email')}
        />
      </Stack>
    </OnboardingLayout>
  );
};

export default Step1;

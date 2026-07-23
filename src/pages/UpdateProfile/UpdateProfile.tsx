import { useState } from 'react';
import { Alert, Snackbar, Stack, Typography } from '@mui/material';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProfileImageUpload from '../../components/ProfileImageUpload';
import FormTextField from '../../components/form/FormTextField';
import { useFormValidation, type ValidationSchema } from '../../hooks/useFormValidation';
import { composeValidators, isEmail, isNumeric, numberRange, required } from '../../utils/validators';
import type { UpdateProfileProps } from './UpdateProfile.types';
import type { PersonalProfileData } from '../../types/onboarding.types';

const validationSchema: ValidationSchema<Pick<PersonalProfileData, 'fullName' | 'age' | 'email'>> = {
  fullName: composeValidators(required('Full name is required')),
  age: composeValidators(required('Age is required'), isNumeric('Age must be a number'), numberRange(1, 120)),
  email: composeValidators(required('Email is required'), isEmail()),
};

const UpdateProfile = ({
  data,
  onChange,
  onImageChange,
  onSave,
  sidebarItems,
  onSidebarItemClick,
  onLogout,
}: UpdateProfileProps) => {
  const { handleBlur, validateAll, getError } = useFormValidation(validationSchema);
  const [savedMessageOpen, setSavedMessageOpen] = useState(false);

  const handleSave = () => {
    const isValid = validateAll({ fullName: data.fullName, age: data.age, email: data.email });
    if (isValid) {
      onSave();
      setSavedMessageOpen(true);
    }
  };

  return (
    <Layout
      sidebarItems={sidebarItems}
      onSidebarItemClick={onSidebarItemClick}
      onLogout={onLogout}
      userName={data.fullName}
      userAvatarUrl={data.profileImageUrl}
    >
      <Stack spacing={4} sx={{ maxWidth: 560 }}>
        <Stack spacing={0.5}>
          <Typography variant="h2">Update Profile</Typography>
          <Typography variant="subtitle1">Keep your personal details up to date.</Typography>
        </Stack>

        <Card>
          <Stack spacing={3}>
            <ProfileImageUpload imageUrl={data.profileImageUrl} onImageChange={onImageChange} />

            <FormTextField
              label="Full Name"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName', data.fullName)}
              error={getError('fullName')}
            />
            <FormTextField
              label="Age"
              type="number"
              value={data.age}
              onChange={(e) => onChange('age', e.target.value)}
              onBlur={() => handleBlur('age', data.age)}
              error={getError('age')}
            />
            <FormTextField
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              onBlur={() => handleBlur('email', data.email)}
              error={getError('email')}
            />

            <Button onClick={handleSave} sx={{ alignSelf: 'flex-start' }}>
              Save Changes
            </Button>
          </Stack>
        </Card>
      </Stack>

      <Snackbar
        open={savedMessageOpen}
        autoHideDuration={3000}
        onClose={() => setSavedMessageOpen(false)}
      >
        <Alert severity="success" onClose={() => setSavedMessageOpen(false)}>
          Profile updated successfully.
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default UpdateProfile;

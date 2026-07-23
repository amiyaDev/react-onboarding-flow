import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import FormTextField from '../FormTextField';
import type { FormPasswordFieldProps } from './FormPasswordField.types';

const FormPasswordField = (props: FormPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormTextField
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end" tabIndex={-1}>
                {showPassword ? (
                  <VisibilityOffRoundedIcon fontSize="small" />
                ) : (
                  <VisibilityRoundedIcon fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default FormPasswordField;

import { Checkbox, FormControlLabel, FormHelperText, Stack } from '@mui/material';
import type { FormCheckboxFieldProps } from './FormCheckboxField.types';

const FormCheckboxField = ({ label, checked, onChange, error, disabled }: FormCheckboxFieldProps) => {
  return (
    <Stack spacing={0.25}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            size="small"
            disabled={disabled}
          />
        }
        label={label}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Stack>
  );
};

export default FormCheckboxField;

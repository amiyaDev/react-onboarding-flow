import type { InputProps } from '../../ui/Input';

export interface FormTextFieldProps extends Omit<InputProps, 'error'> {
  error?: string;
}

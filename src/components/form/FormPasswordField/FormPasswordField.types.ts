import type { FormTextFieldProps } from '../FormTextField/FormTextField.types';

export type FormPasswordFieldProps = Omit<FormTextFieldProps, 'type' | 'slotProps'>;

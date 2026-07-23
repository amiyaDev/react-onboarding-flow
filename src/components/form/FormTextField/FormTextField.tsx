import Input from '../../ui/Input';
import type { FormTextFieldProps } from './FormTextField.types';

const FormTextField = ({ error, helperText, ...rest }: FormTextFieldProps) => {
  return <Input error={Boolean(error)} helperText={error ?? helperText} {...rest} />;
};

export default FormTextField;

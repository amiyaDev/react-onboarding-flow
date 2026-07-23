import { TextField } from '@mui/material';
import type { InputProps } from './Input.types';

const Input = ({ fullWidth = true, size = 'medium', ...rest }: InputProps) => {
  return <TextField fullWidth={fullWidth} size={size} {...rest} />;
};

export default Input;

import { Button as MuiButton } from '@mui/material';
import type { ButtonProps } from './Button.types';

const Button = ({ variantKind = 'primary', size = 'large', ...rest }: ButtonProps) => {
  if (variantKind === 'secondary') {
    return <MuiButton variant="outlined" color="primary" size={size} {...rest} />;
  }

  if (variantKind === 'text') {
    return <MuiButton variant="text" color="primary" size={size} {...rest} />;
  }

  return <MuiButton variant="contained" color="primary" size={size} {...rest} />;
};

export default Button;

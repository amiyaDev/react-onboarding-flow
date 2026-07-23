import type { ButtonProps as MuiButtonProps } from '@mui/material';

export type ButtonVariantKind = 'primary' | 'secondary' | 'text';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color'> {
  variantKind?: ButtonVariantKind;
}

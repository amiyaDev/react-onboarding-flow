import type { CardProps as MuiCardProps } from '@mui/material';

export interface CardProps extends MuiCardProps {
  noPadding?: boolean;
}

import { Card as MuiCard } from '@mui/material';
import type { CardProps } from './Card.types';

const Card = ({ noPadding = false, sx, children, ...rest }: CardProps) => {
  return (
    <MuiCard sx={{ p: noPadding ? 0 : 3, ...sx }} {...rest}>
      {children}
    </MuiCard>
  );
};

export default Card;

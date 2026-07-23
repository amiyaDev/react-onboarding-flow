import { Box, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import Input from '../ui/Input';
import type { PaymentCardProps } from './PaymentCard.types';

const PaymentCard = ({ value, onChange }: PaymentCardProps) => {
  return (
      <Stack spacing={3}>
        <Input
          label="Cardholder Name"
          placeholder="John Doe"
          value={value.cardholderName}
          onChange={(e) => onChange('cardholderName', e.target.value)}
        />

        <Input
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          value={value.cardNumber}
          onChange={(e) => onChange('cardNumber', e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              value={value.expiryDate}
              onChange={(e) => onChange('expiryDate', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Input
              label="CVV"
              placeholder="123"
              type="password"
              value={value.cvv}
              onChange={(e) => onChange('cvv', e.target.value)}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '12px',
            px: 2,
            py: 1.5,
          }}
        >
          <LockRoundedIcon sx={{ color: '#22C55E', fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: '#15803D', fontWeight: 500 }}>
            Your payment information is encrypted and securely processed.
          </Typography>
        </Box>
      </Stack>
  );
};

export default PaymentCard;

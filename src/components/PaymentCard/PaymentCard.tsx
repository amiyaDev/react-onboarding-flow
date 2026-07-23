import { Box, Chip, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import FormTextField from '../form/FormTextField';
import { detectCardBrand } from '../../utils/cardValidators';
import type { PaymentCardProps } from './PaymentCard.types';

const CARD_BRAND_LABELS: Record<string, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  discover: 'Discover',
};

const PaymentCard = ({ value, onChange, onBlur, errors }: PaymentCardProps) => {
  const cardBrand = detectCardBrand(value.cardNumber);
  const showBrandChip = cardBrand !== 'unknown' && !errors?.cardNumber;

  return (
      <Stack spacing={3}>
        <FormTextField
          label="Cardholder Name"
          placeholder="John Doe"
          value={value.cardholderName}
          onChange={(e) => onChange('cardholderName', e.target.value)}
          onBlur={() => onBlur?.('cardholderName')}
          error={errors?.cardholderName}
        />

        <FormTextField
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          value={value.cardNumber}
          onChange={(e) => onChange('cardNumber', e.target.value)}
          onBlur={() => onBlur?.('cardNumber')}
          error={errors?.cardNumber}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: showBrandChip ? (
                <InputAdornment position="end">
                  <Chip
                    label={CARD_BRAND_LABELS[cardBrand]}
                    size="small"
                    sx={{ bgcolor: '#EEF2FF', color: '#4F46E5', fontWeight: 600 }}
                  />
                </InputAdornment>
              ) : undefined,
            },
          }}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <FormTextField
              label="Expiry Date"
              placeholder="MM/YY"
              value={value.expiryDate}
              onChange={(e) => onChange('expiryDate', e.target.value)}
              onBlur={() => onBlur?.('expiryDate')}
              error={errors?.expiryDate}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormTextField
              label="CVV"
              placeholder="123"
              type="password"
              value={value.cvv}
              onChange={(e) => onChange('cvv', e.target.value)}
              onBlur={() => onBlur?.('cvv')}
              error={errors?.cvv}
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

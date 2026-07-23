import { Box, Stack, Typography } from '@mui/material';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import type { PaymentMethodCardProps } from './PaymentMethodCard.types';

const BRAND_LABELS: Record<string, string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
  unknown: 'Card',
};

const PaymentMethodCard = ({ brand, last4, cardholderName, expiryDate }: PaymentMethodCardProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 380,
        aspectRatio: '1.6 / 1',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #4F46E5 0%, #312E81 100%)',
        color: '#fff',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 12px 32px rgba(79, 70, 229, 0.35)',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <SimCardRoundedIcon sx={{ fontSize: 32, opacity: 0.9, transform: 'rotate(90deg)' }} />
        <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700, letterSpacing: 1 }}>
          {BRAND_LABELS[brand] ?? BRAND_LABELS.unknown}
        </Typography>
      </Stack>

      <Typography variant="h4" sx={{ letterSpacing: 3, fontFamily: 'monospace' }}>
        •••• •••• •••• {last4 || '••••'}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
        <Stack spacing={0.25}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Card Holder
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            {cardholderName || '—'}
          </Typography>
        </Stack>
        <Stack spacing={0.25}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Expires
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {expiryDate || '—'}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PaymentMethodCard;

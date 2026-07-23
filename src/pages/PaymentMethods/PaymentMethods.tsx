import { Alert, Stack, Typography } from '@mui/material';
import Layout from '../../components/layout/Layout';
import PaymentMethodCard from '../../components/PaymentMethodCard';
import type { PaymentMethodsProps } from './PaymentMethods.types';

const PaymentMethods = ({
  savedPaymentMethod,
  userName,
  userAvatarUrl,
  sidebarItems,
  onSidebarItemClick,
  onLogout,
}: PaymentMethodsProps) => {
  return (
    <Layout
      sidebarItems={sidebarItems}
      onSidebarItemClick={onSidebarItemClick}
      onLogout={onLogout}
      userName={userName}
      userAvatarUrl={userAvatarUrl}
    >
      <Stack spacing={4}>
        <Stack spacing={0.5}>
          <Typography variant="h2">Payment Methods</Typography>
          <Typography variant="subtitle1">The card saved during onboarding.</Typography>
        </Stack>

        {savedPaymentMethod ? (
          <Stack spacing={3} alignItems="flex-start">
            <PaymentMethodCard
              brand={savedPaymentMethod.brand}
              last4={savedPaymentMethod.last4}
              cardholderName={savedPaymentMethod.cardholderName}
              expiryDate={savedPaymentMethod.expiryDate}
            />
            <Alert severity="info" sx={{ borderRadius: '12px' }}>
              For your security, the full card number and CVV are never stored — only the last 4
              digits are kept so you can recognize this card.
            </Alert>
          </Stack>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No payment method saved yet.
          </Typography>
        )}
      </Stack>
    </Layout>
  );
};

export default PaymentMethods;

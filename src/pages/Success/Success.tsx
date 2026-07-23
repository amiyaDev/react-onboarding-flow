import { Box, Container, Stack, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Button from '../../components/ui/Button';
import type { SuccessProps } from './Success.types';

const popIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
`;

const ripple = keyframes`
  0% { transform: scale(0.9); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
`;

const Success = ({ userName, onGoToHome }: SuccessProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 8,
      }}
    >
      <Container maxWidth="xs">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Box position="relative" width={120} height={120} display="flex" alignItems="center" justifyContent="center">
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                bgcolor: 'success.main',
                opacity: 0.25,
                animation: `${ripple} 1.8s ease-out infinite`,
              }}
            />
            <Box
              sx={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                bgcolor: 'success.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: `${popIn} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                boxShadow: '0 8px 24px rgba(34, 197, 94, 0.35)',
              }}
            >
              <CheckRoundedIcon sx={{ fontSize: 56, color: '#fff' }} />
            </Box>
          </Box>

          <Stack spacing={1.5}>
            <Typography variant="h2">Congratulations{userName ? `, ${userName}` : ''}!</Typography>
            <Typography variant="body1" color="text.secondary">
              Your onboarding is complete. Your profile, preferences, and payment details have
              been saved successfully.
            </Typography>
          </Stack>

          <Button onClick={onGoToHome} size="large">
            Go to Home
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Success;

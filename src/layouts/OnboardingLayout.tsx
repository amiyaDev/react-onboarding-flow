import type { ReactNode } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressStepper from '../components/ProgressStepper';

export interface OnboardingLayoutProps {
  steps: string[];
  activeStep: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  showPrevious?: boolean;
  nextDisabled?: boolean;
}

const OnboardingLayout = ({
  steps,
  activeStep,
  title,
  subtitle,
  children,
  onPrevious,
  onNext,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  showPrevious = true,
  nextDisabled = false,
}: OnboardingLayoutProps) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="sm">
        <Stack spacing={5}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>O</Typography>
          </Box>

          <ProgressStepper steps={steps} activeStep={activeStep} />

          <Card>
            <Stack spacing={0.75} mb={4}>
              <Typography variant="h3">{title}</Typography>
              {subtitle && (
                <Typography variant="subtitle1" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Stack>

            <Box mb={4}>{children}</Box>

            <Stack direction="row" justifyContent="space-between" spacing={2}>
              {showPrevious ? (
                <Button variantKind="secondary" onClick={onPrevious}>
                  {previousLabel}
                </Button>
              ) : (
                <Box />
              )}
              <Button variantKind="primary" onClick={onNext} disabled={nextDisabled}>
                {nextLabel}
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default OnboardingLayout;

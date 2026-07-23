import type { ReactNode } from 'react';
import { Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import type { ProgressStepperProps } from './ProgressStepper.types';

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 2,
    borderColor: theme.palette.border,
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
  },
}));

const StepIconRoot = styled('div')<{ ownerState: { active?: boolean; completed?: boolean } }>(
  ({ theme, ownerState }) => ({
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '0.9rem',
    border: `2px solid ${theme.palette.border}`,
    color: theme.palette.text.secondary,
    backgroundColor: '#FFFFFF',
    transition: 'all 0.2s ease',
    ...(ownerState.active && {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      boxShadow: `0 0 0 4px rgba(79, 70, 229, 0.12)`,
    }),
    ...(ownerState.completed && {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: '#FFFFFF',
    }),
  }),
);

interface StepIconProps {
  active?: boolean;
  completed?: boolean;
  icon: ReactNode;
}

function StepIcon({ active, completed, icon }: StepIconProps) {
  return (
    <StepIconRoot ownerState={{ active, completed }}>
      {completed ? <CheckRoundedIcon sx={{ fontSize: 20 }} /> : icon}
    </StepIconRoot>
  );
}

const ProgressStepper = ({ steps, activeStep }: ProgressStepperProps) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel connector={<Connector />}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel slots={{ stepIcon: StepIcon }}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default ProgressStepper;

import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type { ReactNode } from 'react';

export function RequireAuth({ children }: { children: ReactNode }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export function RequireCompleted({ children }: { children: ReactNode }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isCompleted = useAppSelector((state) => state.onboarding.isCompleted);
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (!isCompleted) {
    // Keep existing behaviour: redirect back to current onboarding step
    const STEP_PATHS = ['/onboarding/step-1', '/onboarding/step-2', '/onboarding/step-3'];
    const stepPath = STEP_PATHS[currentStep] ?? STEP_PATHS[0];
    return <Navigate to={stepPath} replace />;
  }
  return <>{children}</>;
}

export default RequireAuth;

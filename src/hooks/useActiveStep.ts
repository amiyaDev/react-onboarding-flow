import { useState, useCallback } from 'react';

export function useActiveStep(initialStep = 0) {
  const [activeStep, setActiveStep] = useState(initialStep);

  const goNext = useCallback(() => setActiveStep((prev) => prev + 1), []);
  const goPrevious = useCallback(() => setActiveStep((prev) => Math.max(0, prev - 1)), []);
  const goToStep = useCallback((step: number) => setActiveStep(step), []);

  return { activeStep, goNext, goPrevious, goToStep };
}

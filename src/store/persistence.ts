import type { AuthState } from './slices/authSlice';
import type { OnboardingState } from './slices/onboardingSlice';

const STORAGE_KEY = 'onboarding-app-state';

export interface PersistedRootState {
  auth: AuthState;
  onboarding: OnboardingState;
}

/**
 * Card number and CVV are intentionally never written to localStorage —
 * only the non-sensitive payment fields survive a reload. See the card
 * validation discussion: raw PAN/CVV should never be persisted client-side.
 */
function stripSensitivePaymentFields(onboarding: OnboardingState): OnboardingState {
  return {
    ...onboarding,
    payment: {
      cardholderName: onboarding.payment.cardholderName,
      expiryDate: onboarding.payment.expiryDate,
      cardNumber: '',
      cvv: '',
    },
  };
}

export function loadPersistedState(): PersistedRootState | undefined {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized) as PersistedRootState;
  } catch {
    return undefined;
  }
}

export function savePersistedState(state: PersistedRootState): void {
  try {
    const toPersist: PersistedRootState = {
      auth: state.auth,
      onboarding: stripSensitivePaymentFields(state.onboarding),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
  } catch {
    // localStorage may be unavailable (private browsing, storage full) — fail silently
  }
}

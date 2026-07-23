import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PersonalProfileData, Song, PaymentData, SavedPaymentMethod } from '../../types/onboarding.types';

export interface OnboardingState {
  currentStep: number;
  isCompleted: boolean;
  profile: PersonalProfileData;
  songs: Song[];
  payment: PaymentData;
  savedPaymentMethod: SavedPaymentMethod | null;
}

const initialState: OnboardingState = {
  currentStep: 0,
  isCompleted: false,
  profile: { fullName: '', age: '', email: '' },
  songs: [{ id: crypto.randomUUID(), title: '', artist: '' }],
  payment: { cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' },
  savedPaymentMethod: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    goToNextStep: (state) => {
      state.currentStep += 1;
    },
    goToPreviousStep: (state) => {
      state.currentStep = Math.max(0, state.currentStep - 1);
    },
    updateProfileField: (
      state,
      action: PayloadAction<{ field: keyof PersonalProfileData; value: string }>,
    ) => {
      state.profile[action.payload.field] = action.payload.value;
    },
    setProfileImage: (state, action: PayloadAction<string | undefined>) => {
      state.profile.profileImageUrl = action.payload;
    },
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    updatePaymentField: (
      state,
      action: PayloadAction<{ field: keyof PaymentData; value: string }>,
    ) => {
      state.payment[action.payload.field] = action.payload.value;
    },
    savePaymentMethod: (state, action: PayloadAction<SavedPaymentMethod>) => {
      state.savedPaymentMethod = action.payload;
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  setCurrentStep,
  goToNextStep,
  goToPreviousStep,
  updateProfileField,
  setProfileImage,
  setSongs,
  updatePaymentField,
  savePaymentMethod,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;

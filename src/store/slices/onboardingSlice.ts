import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PersonalProfileData, Song, PaymentData } from '../../types/onboarding.types';

export interface OnboardingState {
  currentStep: number;
  isCompleted: boolean;
  profile: PersonalProfileData;
  songs: Song[];
  payment: PaymentData;
}

const initialState: OnboardingState = {
  currentStep: 0,
  isCompleted: false,
  profile: { fullName: '', age: '', email: '' },
  songs: [{ id: crypto.randomUUID(), title: '', artist: '' }],
  payment: { cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' },
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
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    updateSong: (
      state,
      action: PayloadAction<{ id: string; field: keyof Omit<Song, 'id'>; value: string }>,
    ) => {
      const song = state.songs.find((item) => item.id === action.payload.id);
      if (song) {
        song[action.payload.field] = action.payload.value;
      }
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    updatePaymentField: (
      state,
      action: PayloadAction<{ field: keyof PaymentData; value: string }>,
    ) => {
      state.payment[action.payload.field] = action.payload.value;
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
  addSong,
  updateSong,
  deleteSong,
  updatePaymentField,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;

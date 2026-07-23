import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import theme from './theme/theme';
import Login from './pages/Login';
import Step1 from './pages/Onboarding/Step1';
import Step2 from './pages/Onboarding/Step2';
import Step3 from './pages/Onboarding/Step3';
import Success from './pages/Success';
import Home from './pages/Home';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loginSuccess } from './store/slices/authSlice';
import {
  addSong,
  completeOnboarding,
  deleteSong,
  setCurrentStep,
  setProfileImage,
  updatePaymentField,
  updateProfileField,
  updateSong,
} from './store/slices/onboardingSlice';
import type { Song } from './types/onboarding.types';

const createEmptySong = (): Song => ({
  id: crypto.randomUUID(),
  title: '',
  artist: '',
});

function LoginRoute() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Login
      onLogin={(username) => {
        dispatch(loginSuccess({ username }));
        dispatch(setCurrentStep(0));
        navigate('/onboarding/step-1');
      }}
      onForgotPassword={() => {}}
    />
  );
}

function Step1Route() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.onboarding.profile);

  return (
    <Step1
      data={profile}
      onChange={(field, value) => dispatch(updateProfileField({ field, value }))}
      onImageChange={(_file, previewUrl) => dispatch(setProfileImage(previewUrl ?? undefined))}
      onPrevious={() => navigate('/')}
      onNext={() => {
        dispatch(setCurrentStep(1));
        navigate('/onboarding/step-2');
      }}
      showPrevious
    />
  );
}

function Step2Route() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const songs = useAppSelector((state) => state.onboarding.songs);

  return (
    <Step2
      songs={songs}
      onSongChange={(id, field, value) => dispatch(updateSong({ id, field, value }))}
      onAddSong={() => dispatch(addSong(createEmptySong()))}
      onDeleteSong={(id) => dispatch(deleteSong(id))}
      onPrevious={() => {
        dispatch(setCurrentStep(0));
        navigate('/onboarding/step-1');
      }}
      onNext={() => {
        dispatch(setCurrentStep(2));
        navigate('/onboarding/step-3');
      }}
    />
  );
}

function Step3Route() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const payment = useAppSelector((state) => state.onboarding.payment);

  return (
    <Step3
      data={payment}
      onChange={(field, value) => dispatch(updatePaymentField({ field, value }))}
      onPrevious={() => {
        dispatch(setCurrentStep(1));
        navigate('/onboarding/step-2');
      }}
      onFinish={() => {
        dispatch(completeOnboarding());
        navigate('/success');
      }}
    />
  );
}

function SuccessRoute() {
  const navigate = useNavigate();
  const fullName = useAppSelector((state) => state.onboarding.profile.fullName);
  return <Success userName={fullName.split(' ')[0]} onGoToHome={() => navigate('/home')} />;
}

function HomeRoute() {
  const profile = useAppSelector((state) => state.onboarding.profile);
  const isCompleted = useAppSelector((state) => state.onboarding.isCompleted);

  return (
    <Home
      profile={{
        fullName: profile.fullName || 'John Doe',
        email: profile.email || 'john@example.com',
        age: profile.age,
        profileImageUrl: profile.profileImageUrl,
        onboardingCompleted: isCompleted,
      }}
      quickActions={[
        {
          id: 'edit-profile',
          label: 'Edit Profile',
          description: 'Update your personal details',
          icon: <PersonRoundedIcon fontSize="small" />,
        },
        {
          id: 'manage-songs',
          label: 'Manage Songs',
          description: 'Update your favorite songs',
          icon: <MusicNoteRoundedIcon fontSize="small" />,
        },
        {
          id: 'payment-methods',
          label: 'Payment Methods',
          description: 'View saved payment details',
          icon: <CreditCardRoundedIcon fontSize="small" />,
        },
      ]}
      recentActivity={[
        {
          id: '1',
          title: 'Onboarding completed',
          description: 'You finished setting up your account',
          timestamp: 'Just now',
          icon: 'success',
        },
        {
          id: '2',
          title: 'Payment method added',
          description: 'A new card was added to your account',
          timestamp: '2 min ago',
          icon: 'info',
        },
      ]}
    />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRoute />} />
          <Route path="/onboarding/step-1" element={<Step1Route />} />
          <Route path="/onboarding/step-2" element={<Step2Route />} />
          <Route path="/onboarding/step-3" element={<Step3Route />} />
          <Route path="/success" element={<SuccessRoute />} />
          <Route path="/home" element={<HomeRoute />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

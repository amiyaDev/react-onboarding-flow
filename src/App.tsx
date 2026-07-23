import { useState, type Dispatch, type SetStateAction } from 'react';
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
import type { PersonalProfileData, Song, PaymentData } from './types/onboarding.types';

const createEmptySong = (): Song => ({
  id: crypto.randomUUID(),
  title: '',
  artist: '',
});

function LoginRoute() {
  const navigate = useNavigate();
  return (
    <Login
      onLogin={() => navigate('/onboarding/step-1')}
      onForgotPassword={() => {}}
    />
  );
}

function Step1Route({
  profile,
  setProfile,
}: {
  profile: PersonalProfileData;
  setProfile: Dispatch<SetStateAction<PersonalProfileData>>;
}) {
  const navigate = useNavigate();
  return (
    <Step1
      data={profile}
      onChange={(field, value) => setProfile((prev) => ({ ...prev, [field]: value }))}
      onImageChange={(_file, previewUrl) =>
        setProfile((prev) => ({ ...prev, profileImageUrl: previewUrl ?? undefined }))
      }
      onPrevious={() => navigate('/')}
      onNext={() => navigate('/onboarding/step-2')}
      showPrevious
    />
  );
}

function Step2Route({
  songs,
  setSongs,
}: {
  songs: Song[];
  setSongs: Dispatch<SetStateAction<Song[]>>;
}) {
  const navigate = useNavigate();
  return (
    <Step2
      songs={songs}
      onSongChange={(id, field, value) =>
        setSongs((prev) => prev.map((song) => (song.id === id ? { ...song, [field]: value } : song)))
      }
      onAddSong={() => setSongs((prev) => [...prev, createEmptySong()])}
      onDeleteSong={(id) => setSongs((prev) => prev.filter((song) => song.id !== id))}
      onPrevious={() => navigate('/onboarding/step-1')}
      onNext={() => navigate('/onboarding/step-3')}
    />
  );
}

function Step3Route({
  payment,
  setPayment,
}: {
  payment: PaymentData;
  setPayment: Dispatch<SetStateAction<PaymentData>>;
}) {
  const navigate = useNavigate();
  return (
    <Step3
      data={payment}
      onChange={(field, value) => setPayment((prev) => ({ ...prev, [field]: value }))}
      onPrevious={() => navigate('/onboarding/step-2')}
      onFinish={() => navigate('/success')}
    />
  );
}

function SuccessRoute({ fullName }: { fullName: string }) {
  const navigate = useNavigate();
  return <Success userName={fullName.split(' ')[0]} onGoToHome={() => navigate('/home')} />;
}

function HomeRoute({ profile }: { profile: PersonalProfileData }) {
  return (
    <Home
      profile={{
        fullName: profile.fullName || 'John Doe',
        email: profile.email || 'sanket@example.com',
        age: profile.age,
        profileImageUrl: profile.profileImageUrl,
        onboardingCompleted: true,
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
  const [profile, setProfile] = useState<PersonalProfileData>({ fullName: '', age: '', email: '' });
  const [songs, setSongs] = useState<Song[]>([createEmptySong()]);
  const [payment, setPayment] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRoute />} />
          <Route
            path="/onboarding/step-1"
            element={<Step1Route profile={profile} setProfile={setProfile} />}
          />
          <Route path="/onboarding/step-2" element={<Step2Route songs={songs} setSongs={setSongs} />} />
          <Route
            path="/onboarding/step-3"
            element={<Step3Route payment={payment} setPayment={setPayment} />}
          />
          <Route path="/success" element={<SuccessRoute fullName={profile.fullName} />} />
          <Route path="/home" element={<HomeRoute profile={profile} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

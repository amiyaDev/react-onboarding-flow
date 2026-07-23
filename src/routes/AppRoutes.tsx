import  {  lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';

// Route-level code-splitting: lazy-load pages to reduce initial bundle size
const Login = lazy(() => import('../pages/Login'));
const Step1 = lazy(() => import('../pages/Onboarding/Step1'));
const Step2 = lazy(() => import('../pages/Onboarding/Step2'));
const Step3 = lazy(() => import('../pages/Onboarding/Step3'));
const Success = lazy(() => import('../pages/Success'));
const Home = lazy(() => import('../pages/Home'));
const UpdateProfile = lazy(() => import('../pages/UpdateProfile'));
const PaymentMethods = lazy(() => import('../pages/PaymentMethods'));
const ComingSoon = lazy(() => import('../pages/ComingSoon'));
import { buildSidebarItems } from '../components/layout/Sidebar/sidebarLinks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginSuccess, logout } from '../store/slices/authSlice';
import {
  completeOnboarding,
  savePaymentMethod,
  setCurrentStep,
  setProfileImage,
  setSongs,
  updatePaymentField,
  updateProfileField,
} from '../store/slices/onboardingSlice';
import { detectCardBrand } from '../utils/cardValidators';
import { RequireAuth, RequireCompleted } from '../components/Auth';

const STEP_PATHS = ['/onboarding/step-1', '/onboarding/step-2', '/onboarding/step-3'];

const COMING_SOON_TITLES: Record<string, string> = {
  songs: 'Favorite Songs',
  settings: 'Settings',
};

function stepPathFor(step: number): string {
  return STEP_PATHS[step] ?? STEP_PATHS[0];
}

function useAppShell(activeId: string) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSidebarItemClick = (id: string) => {
    switch (id) {
      case 'dashboard':
        navigate('/home');
        break;
      case 'profile':
        navigate('/profile/edit');
        break;
      case 'songs':
        navigate('/coming-soon/songs');
        break;
      case 'payment':
        navigate('/payment-methods');
        break;
      case 'settings':
        navigate('/coming-soon/settings');
        break;
      default:
        break;
    }
  };

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return {
    sidebarItems: buildSidebarItems(activeId),
    onSidebarItemClick,
    onLogout,
  };
}

function LoginRoute() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isCompleted = useAppSelector((state) => state.onboarding.isCompleted);
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);

  if (isAuthenticated) {
    return <Navigate to={isCompleted ? '/home' : stepPathFor(currentStep)} replace />;
  }

  return (
    <Login
      onLogin={(username) => dispatch(loginSuccess({ username }))}
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
        navigate(stepPathFor(1));
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
      onSubmit={(updatedSongs) => {
        dispatch(setSongs(updatedSongs));
        dispatch(setCurrentStep(2));
        navigate(stepPathFor(2));
      }}
      onPrevious={() => navigate(stepPathFor(0))}
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
      onPrevious={() => navigate(stepPathFor(1))}
      onFinish={() => {
        const digitsOnly = payment.cardNumber.replace(/\s/g, '');
        dispatch(
          savePaymentMethod({
            brand: detectCardBrand(payment.cardNumber),
            last4: digitsOnly.slice(-4),
            cardholderName: payment.cardholderName,
            expiryDate: payment.expiryDate,
          }),
        );
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
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.onboarding.profile);
  const isCompleted = useAppSelector((state) => state.onboarding.isCompleted);
  const shell = useAppShell('dashboard');

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
          onClick: () => navigate('/profile/edit'),
        },
        {
          id: 'manage-songs',
          label: 'Manage Songs',
          description: 'Update your favorite songs',
          icon: <MusicNoteRoundedIcon fontSize="small" />,
          onClick: () => navigate('/coming-soon/songs'),
        },
        {
          id: 'payment-methods',
          label: 'Payment Methods',
          description: 'View saved payment details',
          icon: <CreditCardRoundedIcon fontSize="small" />,
          onClick: () => navigate('/payment-methods'),
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
      {...shell}
    />
  );
}

function UpdateProfileRoute() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.onboarding.profile);
  const shell = useAppShell('profile');

  return (
    <UpdateProfile
      data={profile}
      onChange={(field, value) => dispatch(updateProfileField({ field, value }))}
      onImageChange={(_file, previewUrl) => dispatch(setProfileImage(previewUrl ?? undefined))}
      onSave={() => {}}
      {...shell}
    />
  );
}

function PaymentMethodsRoute() {
  const profile = useAppSelector((state) => state.onboarding.profile);
  const savedPaymentMethod = useAppSelector((state) => state.onboarding.savedPaymentMethod);
  const shell = useAppShell('payment');

  return (
    <PaymentMethods
      savedPaymentMethod={savedPaymentMethod}
      userName={profile.fullName}
      userAvatarUrl={profile.profileImageUrl}
      {...shell}
    />
  );
}

function ComingSoonRoute() {
  const { feature } = useParams<{ feature: string }>();
  const profile = useAppSelector((state) => state.onboarding.profile);
  const shell = useAppShell(feature ?? '');
  const title = (feature && COMING_SOON_TITLES[feature]) || 'This Feature';

  return (
    <ComingSoon title={title} userName={profile.fullName} userAvatarUrl={profile.profileImageUrl} {...shell} />
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
      <Route path="/" element={<LoginRoute />} />
      <Route
        path="/onboarding/step-1"
        element={
          <RequireAuth>
            <Step1Route />
          </RequireAuth>
        }
      />
      <Route
        path="/onboarding/step-2"
        element={
          <RequireAuth>
            <Step2Route />
          </RequireAuth>
        }
      />
      <Route
        path="/onboarding/step-3"
        element={
          <RequireAuth>
            <Step3Route />
          </RequireAuth>
        }
      />
      <Route
        path="/success"
        element={
          <RequireAuth>
            <SuccessRoute />
          </RequireAuth>
        }
      />
      <Route
        path="/home"
        element={
          <RequireCompleted>
            <HomeRoute />
          </RequireCompleted>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <RequireCompleted>
            <UpdateProfileRoute />
          </RequireCompleted>
        }
      />
      <Route
        path="/payment-methods"
        element={
          <RequireCompleted>
            <PaymentMethodsRoute />
          </RequireCompleted>
        }
      />
      <Route
        path="/coming-soon/:feature"
        element={
          <RequireCompleted>
            <ComingSoonRoute />
          </RequireCompleted>
        }
      />
    </Routes>
    </Suspense>
  );
}

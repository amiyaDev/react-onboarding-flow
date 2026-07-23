import { useState, type FormEvent } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import type { LoginProps } from './Login.types';

const Login = ({ onLogin, onForgotPassword, isLoading = false }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onLogin?.(username, password, rememberMe);
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, md: 8 },
          py: { xs: 6, md: 0 },
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 420 }}>
          <Stack spacing={0.5} mb={5}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>O</Typography>
            </Box>
            <Typography variant="h2">Welcome back</Typography>
            <Typography variant="subtitle1">Sign in to continue your onboarding journey.</Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <Input
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                          {showPassword ? (
                            <VisibilityOffRoundedIcon fontSize="small" />
                          ) : (
                            <VisibilityRoundedIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Remember me
                    </Typography>
                  }
                />
                <Link
                  component="button"
                  type="button"
                  onClick={onForgotPassword}
                  underline="hover"
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                >
                  Forgot password?
                </Link>
              </Stack>

              <Button type="submit" fullWidth loading={isLoading}>
                Log In
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>

      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Stack spacing={4} alignItems="center" sx={{ px: 6, position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: '24px',
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(6px)',
            }}
          >
            <RocketLaunchRoundedIcon sx={{ fontSize: 48, color: '#fff' }} />
          </Box>
          <Stack spacing={1.5} textAlign="center" maxWidth={380}>
            <Typography variant="h3" sx={{ color: '#fff' }}>
              A smoother way to get started
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Set up your profile, preferences, and payment in just a few guided steps.
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Login;

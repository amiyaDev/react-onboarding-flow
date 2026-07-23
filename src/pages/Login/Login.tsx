import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormTextField from '../../components/form/FormTextField';
import FormPasswordField from '../../components/form/FormPasswordField';
import FormCheckboxField from '../../components/form/FormCheckboxField';
import Button from '../../components/ui/Button';
import type { LoginProps } from './Login.types';

// Yup validation schema
const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters'),
  password:Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must not exceed 100 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?`~]/,
    "Password must contain at least one special character"
  ),
  rememberMe: Yup.boolean(),
});

const Login = ({ onLogin, onForgotPassword, isLoading = false }: LoginProps) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      onLogin?.(values.username, values.password, values.rememberMe);
    },
  })


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

          <Box component="form" onSubmit={formik.handleSubmit}>
            <Stack spacing={2.5}>
              <FormTextField
                label="Username"
                placeholder="Enter your username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username ? formik.errors.username : undefined}
              />

              <FormPasswordField
                label="Password"
                placeholder="Enter your password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password ? formik.errors.password : undefined}
              />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormCheckboxField
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Remember me
                    </Typography>
                  }
                  checked={formik.values.rememberMe}
                  onChange={(checked) => formik.setFieldValue('rememberMe', checked)}
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

              <Button type="submit" fullWidth loading={isLoading} disabled={!formik.isValid && formik.dirty}>
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

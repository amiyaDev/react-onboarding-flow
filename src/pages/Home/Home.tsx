import { Avatar, Box, Chip, Grid, Stack, Typography } from '@mui/material';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import type { HomeProps } from './Home.types';

const ACTIVITY_ICONS = {
  success: <CheckCircleRoundedIcon sx={{ color: 'success.main' }} fontSize="small" />,
  info: <InfoRoundedIcon sx={{ color: '#3B82F6' }} fontSize="small" />,
  warning: <WarningAmberRoundedIcon sx={{ color: '#F59E0B' }} fontSize="small" />,
};

const Home = ({ profile, quickActions, recentActivity, sidebarItems, onSidebarItemClick, onLogout }: HomeProps) => {
  return (
    <Layout
      sidebarItems={sidebarItems}
      onSidebarItemClick={onSidebarItemClick}
      onLogout={onLogout}
      userName={profile.fullName}
      userAvatarUrl={profile.profileImageUrl}
    >
      <Stack spacing={4}>
        <Card
          sx={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
            border: 'none',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Stack spacing={0.5}>
              <Typography variant="h3" sx={{ color: '#fff' }}>
                Welcome back, {profile.fullName.split(' ')[0] || 'there'} 👋
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                Here's what's happening with your account today.
              </Typography>
            </Stack>
            {profile.onboardingCompleted && (
              <Chip
                icon={<VerifiedRoundedIcon sx={{ color: '#fff !important' }} />}
                label="Onboarding Completed"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.18)',
                  color: '#fff',
                  fontWeight: 600,
                  px: 1,
                }}
              />
            )}
          </Stack>
        </Card>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <Avatar
                  src={profile.profileImageUrl}
                  sx={{ width: 88, height: 88, bgcolor: '#EEF2FF', color: '#4F46E5', fontSize: '2rem' }}
                >
                  {profile.fullName.charAt(0)}
                </Avatar>
                <Stack spacing={0.5}>
                  <Typography variant="h5">{profile.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.email}
                  </Typography>
                  {profile.age && (
                    <Typography variant="body2" color="text.secondary">
                      Age: {profile.age}
                    </Typography>
                  )}
                </Stack>
                {profile.onboardingCompleted && (
                  <Chip
                    icon={<CheckCircleRoundedIcon sx={{ fontSize: '16px !important' }} />}
                    label="Verified Profile"
                    size="small"
                    sx={{ bgcolor: '#F0FDF4', color: '#15803D', fontWeight: 600 }}
                  />
                )}
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%' }}>
              <Typography variant="h5" mb={2.5}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={action.id}>
                    <Box
                      onClick={action.onClick}
                      sx={{
                        border: '1px solid #E2E8F0',
                        borderRadius: '12px',
                        p: 2,
                        cursor: action.onClick ? 'pointer' : 'default',
                        transition: 'all 0.15s ease',
                        '&:hover': action.onClick
                          ? { borderColor: '#4F46E5', bgcolor: '#F8FAFF' }
                          : undefined,
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        {action.icon && (
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '10px',
                              bgcolor: '#EEF2FF',
                              color: '#4F46E5',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {action.icon}
                          </Box>
                        )}
                        <Stack spacing={0.25} minWidth={0}>
                          <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                            {action.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {action.description}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <Typography variant="h5" mb={2.5}>
            Recent Activity
          </Typography>
          <Stack spacing={2}>
            {recentActivity.map((activity) => (
              <Stack
                key={activity.id}
                direction="row"
                spacing={2}
                alignItems="flex-start"
                sx={{
                  pb: 2,
                  borderBottom: '1px solid #F1F5F9',
                  '&:last-of-type': { borderBottom: 'none', pb: 0 },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    bgcolor: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {ACTIVITY_ICONS[activity.icon ?? 'info']}
                </Box>
                <Stack spacing={0.25} flex={1} minWidth={0}>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {activity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.description}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" flexShrink={0}>
                  {activity.timestamp}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Layout>
  );
};

export default Home;

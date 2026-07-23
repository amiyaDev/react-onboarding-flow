import { Box, Stack, Typography } from '@mui/material';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import Layout from '../../components/layout/Layout';
import type { ComingSoonProps } from './ComingSoon.types';

const ComingSoon = ({
  title,
  userName,
  userAvatarUrl,
  sidebarItems,
  onSidebarItemClick,
  onLogout,
}: ComingSoonProps) => {
  return (
    <Layout
      sidebarItems={sidebarItems}
      onSidebarItemClick={onSidebarItemClick}
      onLogout={onLogout}
      userName={userName}
      userAvatarUrl={userAvatarUrl}
    >
      <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ minHeight: '55vh', textAlign: 'center' }}>
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            bgcolor: '#EEF2FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ConstructionRoundedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        </Box>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body1" color="text.secondary">
          This feature is coming soon. Check back later!
        </Typography>
      </Stack>
    </Layout>
  );
};

export default ComingSoon;

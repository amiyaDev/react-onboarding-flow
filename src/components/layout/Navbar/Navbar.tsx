import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import type { NavbarProps } from './Navbar.types';

const Navbar = ({ userName = 'Guest', userAvatarUrl, onMenuClick }: NavbarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        py: 2,
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <IconButton onClick={onMenuClick} sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
          <MenuRoundedIcon />
        </IconButton>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700 }}>O</Typography>
        </Box>
        <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Onboardly
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton sx={{ color: 'text.secondary' }}>
          <NotificationsNoneRoundedIcon />
        </IconButton>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar src={userAvatarUrl} sx={{ width: 36, height: 36 }}>
            {userName.charAt(0)}
          </Avatar>
          <Typography variant="body2" fontWeight={600} sx={{ display: { xs: 'none', sm: 'block' } }}>
            {userName}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Navbar;

import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import type { NavbarProps } from './Navbar.types';
import { useState } from 'react';
import ConfirmDialog from '../../ui/ConfirmDialog/ConfirmDialog';

const Navbar = ({ userName = 'Guest', userAvatarUrl, onMenuClick, onLogout }: NavbarProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogoutClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    onLogout?.();
  };

  return (
    <>
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
        {onLogout && (
          <>
            <Tooltip title="Log out">
              <IconButton onClick={handleLogoutClick} sx={{ color: 'text.secondary' }} aria-label="Log out">
                <LogoutRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <ConfirmDialog
              open={confirmOpen}
              title="Log out"
              description="Are you sure you want to log out?"
              confirmLabel="Log out"
              cancelLabel="Cancel"
              onConfirm={handleConfirm}
              onClose={() => setConfirmOpen(false)}
            />
          </>
        )}
      </Stack>
    </Box>
    </>
  );
};

export default Navbar;

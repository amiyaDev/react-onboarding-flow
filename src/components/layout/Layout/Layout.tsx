import { Box } from '@mui/material';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import type { LayoutProps } from './Layout.types';

const Layout = ({ children, sidebarItems, userName, userAvatarUrl, onSidebarItemClick }: LayoutProps) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar userName={userName} userAvatarUrl={userAvatarUrl} />
      <Box sx={{ display: 'flex' }}>
        {sidebarItems && sidebarItems.length > 0 && (
          <Sidebar items={sidebarItems} onItemClick={onSidebarItemClick} />
        )}
        <Box component="main" sx={{ flex: 1, px: { xs: 2, sm: 3, md: 5 }, py: { xs: 3, md: 5 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

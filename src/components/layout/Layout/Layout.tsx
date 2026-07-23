import { Box } from "@mui/material";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import type { LayoutProps } from "./Layout.types";

const Layout = ({
  children,
  sidebarItems,
  userName,
  userAvatarUrl,
  onSidebarItemClick,
  onLogout,
}: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Navbar
        userName={userName}
        userAvatarUrl={userAvatarUrl}
        onLogout={onLogout}
      />
      <Box sx={{ display: "flex", flex: 1 }}>
        {sidebarItems && sidebarItems.length > 0 && (
          <Sidebar items={sidebarItems} onItemClick={onSidebarItemClick} />
        )}
        <Box
          component="main"
          sx={{ flex: 1, px: { xs: 2, sm: 3, md: 5 }, py: { xs: 3, md: 5 } }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

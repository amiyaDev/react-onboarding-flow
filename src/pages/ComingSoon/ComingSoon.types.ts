import type { SidebarItem } from '../../components/layout/Sidebar/Sidebar.types';

export interface ComingSoonProps {
  title: string;
  userName?: string;
  userAvatarUrl?: string;
  sidebarItems?: SidebarItem[];
  onSidebarItemClick?: (id: string) => void;
  onLogout?: () => void;
}

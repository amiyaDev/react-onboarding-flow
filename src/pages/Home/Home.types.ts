import type { ActivityItem, QuickAction, UserProfileSummary } from '../../types/user.types';
import type { SidebarItem } from '../../components/layout/Sidebar/Sidebar.types';

export interface HomeProps {
  profile: UserProfileSummary;
  quickActions: QuickAction[];
  recentActivity: ActivityItem[];
  sidebarItems?: SidebarItem[];
  onSidebarItemClick?: (id: string) => void;
  onLogout?: () => void;
}

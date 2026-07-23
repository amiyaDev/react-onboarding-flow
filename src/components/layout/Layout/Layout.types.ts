import type { ReactNode } from 'react';
import type { SidebarItem } from '../Sidebar/Sidebar.types';

export interface LayoutProps {
  children: ReactNode;
  sidebarItems?: SidebarItem[];
  userName?: string;
  userAvatarUrl?: string;
  onSidebarItemClick?: (id: string) => void;
}

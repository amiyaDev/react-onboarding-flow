import type { ReactNode } from 'react';

export interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  onItemClick?: (id: string) => void;
}

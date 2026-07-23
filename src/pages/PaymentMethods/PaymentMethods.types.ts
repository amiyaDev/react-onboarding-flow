import type { SavedPaymentMethod } from '../../types/onboarding.types';
import type { SidebarItem } from '../../components/layout/Sidebar/Sidebar.types';

export interface PaymentMethodsProps {
  savedPaymentMethod: SavedPaymentMethod | null;
  userName?: string;
  userAvatarUrl?: string;
  sidebarItems?: SidebarItem[];
  onSidebarItemClick?: (id: string) => void;
  onLogout?: () => void;
}

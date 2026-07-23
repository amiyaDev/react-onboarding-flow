import type { PersonalProfileData } from '../../types/onboarding.types';
import type { SidebarItem } from '../../components/layout/Sidebar/Sidebar.types';

export interface UpdateProfileProps {
  data: PersonalProfileData;
  onChange: (field: keyof PersonalProfileData, value: string) => void;
  onImageChange?: (file: File | null, previewUrl: string | null) => void;
  onSave: () => void;
  sidebarItems?: SidebarItem[];
  onSidebarItemClick?: (id: string) => void;
  onLogout?: () => void;
}

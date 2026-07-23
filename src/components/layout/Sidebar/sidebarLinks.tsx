import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import type { SidebarItem } from './Sidebar.types';

export const SIDEBAR_LINKS: Omit<SidebarItem, 'active'>[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardRoundedIcon fontSize="small" /> },
  { id: 'profile', label: 'Profile', icon: <PersonRoundedIcon fontSize="small" /> },
  { id: 'songs', label: 'Favorite Songs', icon: <MusicNoteRoundedIcon fontSize="small" /> },
  { id: 'payment', label: 'Payment', icon: <CreditCardRoundedIcon fontSize="small" /> },
  { id: 'settings', label: 'Settings', icon: <SettingsRoundedIcon fontSize="small" /> },
];

export function buildSidebarItems(activeId: string): SidebarItem[] {
  return SIDEBAR_LINKS.map((link) => ({ ...link, active: link.id === activeId }));
}

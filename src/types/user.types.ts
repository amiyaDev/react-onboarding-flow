import type { ReactNode } from 'react';

export interface UserProfileSummary {
  fullName: string;
  email: string;
  age?: string;
  profileImageUrl?: string;
  onboardingCompleted: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon?: 'success' | 'info' | 'warning';
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon?: ReactNode;
  onClick?: () => void;
}

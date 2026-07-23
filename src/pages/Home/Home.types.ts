import type { ActivityItem, QuickAction, UserProfileSummary } from '../../types/user.types';

export interface HomeProps {
  profile: UserProfileSummary;
  quickActions: QuickAction[];
  recentActivity: ActivityItem[];
}

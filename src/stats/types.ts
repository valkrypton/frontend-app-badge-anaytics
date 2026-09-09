export interface DailyCount {
  date: string;
  count: number;
}

export interface BadgeStats {
  badgeId: number;
  badgeName: string;
  totalEnrolled: number;
  totalCompletedBlock: number;
  totalAwarded: number;
  awardRatePercent: number;
  computedAt: string;
  dailyCounts: DailyCount[];
}

export interface CourseBadgeStatsResponse {
  badges: BadgeStats[];
}

export interface LearnerProgress {
  userId: number;
  username: string;
  completionPercent: number;
  earned: boolean;
  awardedAt: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

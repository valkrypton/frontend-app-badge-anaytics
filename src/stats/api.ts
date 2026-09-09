import { camelCaseObject, getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';
import { CourseBadgeStatsResponse, LearnerProgress, PaginatedResponse } from './types';

export async function fetchCourseBadgeStats(courseId: string): Promise<CourseBadgeStatsResponse> {
  const url = `${getSiteConfig().cmsBaseUrl}/badges/api/course/${encodeURIComponent(courseId)}/badges/stats/`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return camelCaseObject(data);
}

export function getBadgeLearnersUrl(courseId: string, badgeId: number): string {
  return `${getSiteConfig().cmsBaseUrl}/badges/api/course/${encodeURIComponent(courseId)}/badges/${badgeId}/learners/`;
}

export async function fetchBadgeLearners(url: string): Promise<PaginatedResponse<LearnerProgress>> {
  const { data } = await getAuthenticatedHttpClient().get(url);
  return camelCaseObject(data);
}

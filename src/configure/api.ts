import { camelCaseObject, getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';
import { CourseOutlineResponse } from './types';

export async function fetchCourseOutline(courseId: string): Promise<CourseOutlineResponse> {
  const url = `${getSiteConfig().cmsBaseUrl}/badges/api/course/${encodeURIComponent(courseId)}/badges/outline/`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return camelCaseObject(data);
}

export async function setBlockBadgeConfig(
  usageKey: string,
  badgeEnabled: boolean,
  badgeId: number | null,
): Promise<void> {
  const url = `${getSiteConfig().cmsBaseUrl}/badges/api/block/${encodeURIComponent(usageKey)}/badge_config/`;
  await getAuthenticatedHttpClient().post(url, { badge_enabled: badgeEnabled, badge_id: badgeId });
}

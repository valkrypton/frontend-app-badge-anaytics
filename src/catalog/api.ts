import { camelCaseObject, getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';
import { Badge, BadgeInput } from './types';

function badgesUrl(courseId: string): string {
  return `${getSiteConfig().cmsBaseUrl}/badges/api/course/${encodeURIComponent(courseId)}/badges/`;
}

function badgeDetailUrl(courseId: string, badgeId: number): string {
  return `${badgesUrl(courseId)}${badgeId}/`;
}

function toFormData(input: BadgeInput): FormData {
  const formData = new FormData();
  formData.append('name', input.name);
  formData.append('description', input.description);
  if (input.image) {
    formData.append('image', input.image);
  }
  return formData;
}

export async function fetchBadges(courseId: string): Promise<{ badges: Badge[] }> {
  const { data } = await getAuthenticatedHttpClient().get(badgesUrl(courseId));
  return camelCaseObject(data);
}

export async function createBadge(courseId: string, input: BadgeInput): Promise<Badge> {
  const { data } = await getAuthenticatedHttpClient().post(badgesUrl(courseId), toFormData(input));
  return camelCaseObject(data);
}

export async function updateBadge(courseId: string, badgeId: number, input: BadgeInput): Promise<Badge> {
  const { data } = await getAuthenticatedHttpClient().put(badgeDetailUrl(courseId, badgeId), toFormData(input));
  return camelCaseObject(data);
}

export async function deleteBadge(courseId: string, badgeId: number): Promise<void> {
  await getAuthenticatedHttpClient().delete(badgeDetailUrl(courseId, badgeId));
}

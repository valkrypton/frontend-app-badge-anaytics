jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  getAuthenticatedHttpClient: jest.fn(),
  getSiteConfig: jest.fn(),
}));

import { getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';
import { fetchCourseOutline, setBlockBadgeConfig } from './api';

describe('configure/api', () => {
  const mockGet = jest.fn();
  const mockPost = jest.fn();

  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
    (getAuthenticatedHttpClient as jest.Mock).mockReturnValue({ get: mockGet, post: mockPost });
    (getSiteConfig as jest.Mock).mockReturnValue({ cmsBaseUrl: 'http://studio.local.openedx.io:8001' });
  });

  it('fetches and camelCases the course outline', async () => {
    mockGet.mockResolvedValue({
      data: {
        chapters: [{
          usage_key: 'chapter-1',
          display_name: 'Week 1',
          badge_enabled: false,
          badge_id: null,
          children: [],
        }],
      },
    });

    const result = await fetchCourseOutline('course-v1:Org+Course+Run');

    expect(mockGet).toHaveBeenCalledWith(
      'http://studio.local.openedx.io:8001/badges/api/course/course-v1%3AOrg%2BCourse%2BRun/badges/outline/',
    );
    expect(result).toEqual({
      chapters: [{
        usageKey: 'chapter-1',
        displayName: 'Week 1',
        badgeEnabled: false,
        badgeId: null,
        children: [],
      }],
    });
  });

  it('posts snake_case badge config', async () => {
    mockPost.mockResolvedValue({ data: { success: true } });

    await setBlockBadgeConfig('block-v1:usage-key', true, 5);

    expect(mockPost).toHaveBeenCalledWith(
      'http://studio.local.openedx.io:8001/badges/api/block/block-v1%3Ausage-key/badge_config/',
      { badge_enabled: true, badge_id: 5 },
    );
  });
});

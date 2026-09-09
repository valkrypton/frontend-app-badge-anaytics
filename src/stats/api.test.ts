jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  getAuthenticatedHttpClient: jest.fn(),
  getSiteConfig: jest.fn(),
}));

import { getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';
import { fetchCourseBadgeStats, fetchBadgeLearners, getBadgeLearnersUrl } from './api';

describe('badges stats api', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    mockGet.mockReset();
    (getAuthenticatedHttpClient as jest.Mock).mockReturnValue({ get: mockGet });
    (getSiteConfig as jest.Mock).mockReturnValue({ cmsBaseUrl: 'http://studio.local.openedx.io:8001' });
  });

  it('fetches and camelCases course badge stats', async () => {
    mockGet.mockResolvedValue({
      data: {
        badges: [{
          badge_id: 1,
          badge_name: 'Great Job',
          total_enrolled: 10,
          total_completed_block: 5,
          total_awarded: 3,
          award_rate_percent: 30,
          computed_at: '2026-09-01T00:00:00Z',
          daily_counts: [{ date: '2026-09-01', count: 3 }],
        }],
      },
    });

    const result = await fetchCourseBadgeStats('course-v1:Org+Course+Run');

    expect(mockGet).toHaveBeenCalledWith(
      'http://studio.local.openedx.io:8001/badges/api/course/course-v1%3AOrg%2BCourse%2BRun/badges/stats/',
    );
    expect(result.badges[0]).toEqual({
      badgeId: 1,
      badgeName: 'Great Job',
      totalEnrolled: 10,
      totalCompletedBlock: 5,
      totalAwarded: 3,
      awardRatePercent: 30,
      computedAt: '2026-09-01T00:00:00Z',
      dailyCounts: [{ date: '2026-09-01', count: 3 }],
    });
  });

  it('builds the initial learners URL for a badge', () => {
    expect(getBadgeLearnersUrl('course-v1:Org+Course+Run', 7)).toBe(
      'http://studio.local.openedx.io:8001/badges/api/course/course-v1%3AOrg%2BCourse%2BRun/badges/7/learners/',
    );
  });

  it('fetches and camelCases a page of learner progress', async () => {
    mockGet.mockResolvedValue({
      data: {
        count: 1,
        next: null,
        previous: null,
        results: [{
          user_id: 42,
          username: 'jane',
          completion_percent: 80,
          earned: false,
          awarded_at: null,
        }],
      },
    });

    const result = await fetchBadgeLearners(
      'http://studio.local.openedx.io:8001/badges/api/course/x/badges/7/learners/',
    );

    expect(result.results[0]).toEqual({
      userId: 42,
      username: 'jane',
      completionPercent: 80,
      earned: false,
      awardedAt: null,
    });
  });
});

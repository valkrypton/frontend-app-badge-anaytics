import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@src/test-utils';
import StatsPage from './StatsPage';
import * as api from './api';
import { CourseBadgeStatsResponse } from './types';

jest.mock('./api');

describe('StatsPage', () => {
  const mockedApi = api as jest.Mocked<typeof api>;
  const route = { route: '/course/course-v1:Org+Course+Run', path: '/course/:courseId' };

  it('shows the empty state when there are no badges', async () => {
    const response: CourseBadgeStatsResponse = { badges: [] };
    mockedApi.fetchCourseBadgeStats.mockResolvedValue(response);

    renderWithProviders(<StatsPage />, route);

    expect(await screen.findByText(
      'No badge stats yet — they appear after the next scheduled refresh.',
    )).toBeInTheDocument();
  });

  it('shows the summary table when badges are present', async () => {
    mockedApi.fetchCourseBadgeStats.mockResolvedValue({
      badges: [{
        badgeId: 1,
        badgeName: 'Great Job',
        totalEnrolled: 10,
        totalCompletedBlock: 5,
        totalAwarded: 3,
        awardRatePercent: 30,
        computedAt: '2026-09-01T00:00:00Z',
        dailyCounts: [],
      }],
    });

    renderWithProviders(<StatsPage />, route);

    expect(await screen.findByText('Great Job')).toBeInTheDocument();
    expect(mockedApi.fetchCourseBadgeStats).toHaveBeenCalledWith('course-v1:Org+Course+Run');
  });

  it('shows an error state when the request fails', async () => {
    mockedApi.fetchCourseBadgeStats.mockRejectedValue(new Error('network error'));

    renderWithProviders(<StatsPage />, route);

    await waitFor(() => {
      expect(screen.getByText('Could not load badge stats. Please try again.')).toBeInTheDocument();
    });
  });
});

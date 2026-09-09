import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import SummaryTable from './SummaryTable';
import { BadgeStats } from './types';
import * as api from './api';

jest.mock('./api');

const badges: BadgeStats[] = [
  {
    badgeId: 1,
    badgeName: 'Great Job',
    totalEnrolled: 10,
    totalCompletedBlock: 5,
    totalAwarded: 3,
    awardRatePercent: 30,
    computedAt: '2026-09-01T00:00:00Z',
    dailyCounts: [{ date: '2026-09-01', count: 3 }],
  },
];

describe('SummaryTable', () => {
  const mockedApi = api as jest.Mocked<typeof api>;

  beforeEach(() => {
    mockedApi.getBadgeLearnersUrl.mockReturnValue('http://studio.local.openedx.io:8001/learners/');
    mockedApi.fetchBadgeLearners.mockResolvedValue({
      count: 0, next: null, previous: null, results: [],
    });
  });

  it('renders one row per badge with its summary stats', () => {
    renderWithProviders(<SummaryTable courseId="course-v1:Org+Course+Run" badges={badges} />);
    expect(screen.getByText('Great Job')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it('opens the trend modal for the clicked badge', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SummaryTable courseId="course-v1:Org+Course+Run" badges={badges} />);
    await user.click(screen.getByRole('button', { name: 'View trend' }));
    expect(screen.getByText('Great Job — awards per day')).toBeInTheDocument();
  });

  it('opens the learners modal for the clicked badge', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SummaryTable courseId="course-v1:Org+Course+Run" badges={badges} />);
    await user.click(screen.getByRole('button', { name: 'View learners' }));
    expect(screen.getByText('Great Job — learner progress')).toBeInTheDocument();
  });
});

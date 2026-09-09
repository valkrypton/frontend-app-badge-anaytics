import { screen } from '@testing-library/react';
import { renderWithProviders } from '@src/test-utils';
import TrendModal from './TrendModal';
import { BadgeStats } from './types';

const badge: BadgeStats = {
  badgeId: 1,
  badgeName: 'Great Job',
  totalEnrolled: 10,
  totalCompletedBlock: 5,
  totalAwarded: 3,
  awardRatePercent: 30,
  computedAt: '2026-09-01T00:00:00Z',
  dailyCounts: [
    { date: '2026-09-01', count: 3 },
    { date: '2026-09-02', count: 1 },
  ],
};

describe('TrendModal', () => {
  it('renders the daily award counts for the given badge', () => {
    renderWithProviders(<TrendModal badge={badge} onClose={jest.fn()} />);
    expect(screen.getByText('Great Job — awards per day')).toBeInTheDocument();
    expect(screen.getByText('Sep 1, 2026')).toBeInTheDocument();
    expect(screen.getByText('Sep 2, 2026')).toBeInTheDocument();
  });

  it('renders closed when no badge is selected', () => {
    renderWithProviders(<TrendModal badge={null} onClose={jest.fn()} />);
    expect(screen.queryByText('Sep 1, 2026')).not.toBeInTheDocument();
  });
});

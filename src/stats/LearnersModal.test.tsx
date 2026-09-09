import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@src/test-utils';
import LearnersModal from './LearnersModal';
import * as api from './api';

jest.mock('./api');

describe('LearnersModal', () => {
  const mockedApi = api as jest.Mocked<typeof api>;

  beforeEach(() => {
    mockedApi.fetchBadgeLearners.mockReset();
    mockedApi.getBadgeLearnersUrl.mockReturnValue('http://studio.local.openedx.io:8001/badges/api/course/x/badges/7/learners/');
  });

  it('loads and displays the first page of learners, and disables Previous', async () => {
    mockedApi.fetchBadgeLearners.mockResolvedValue({
      count: 1,
      next: 'http://studio.local.openedx.io:8001/page-2/',
      previous: null,
      results: [
        { userId: 1, username: 'jane', completionPercent: 80, earned: false, awardedAt: null },
      ],
    });

    renderWithProviders(
      <LearnersModal courseId="course-v1:Org+Course+Run" badgeId={7} badgeName="Great Job" onClose={jest.fn()} />,
    );

    expect(await screen.findByText('jane')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  it('fetches the next page when Next is clicked', async () => {
    mockedApi.fetchBadgeLearners.mockResolvedValueOnce({
      count: 2,
      next: 'http://studio.local.openedx.io:8001/page-2/',
      previous: null,
      results: [
        { userId: 1, username: 'jane', completionPercent: 80, earned: false, awardedAt: null },
      ],
    }).mockResolvedValueOnce({
      count: 2,
      next: null,
      previous: 'http://studio.local.openedx.io:8001/page-1/',
      results: [
        { userId: 2, username: 'bob', completionPercent: 100, earned: true, awardedAt: '2026-09-01T00:00:00Z' },
      ],
    });

    const user = userEvent.setup();
    renderWithProviders(
      <LearnersModal courseId="course-v1:Org+Course+Run" badgeId={7} badgeName="Great Job" onClose={jest.fn()} />,
    );

    await screen.findByText('jane');
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(await screen.findByText('bob')).toBeInTheDocument();
    expect(mockedApi.fetchBadgeLearners).toHaveBeenCalledWith('http://studio.local.openedx.io:8001/page-2/');
    await waitFor(() => expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled());
  });

  it('shows nothing when no badge is selected', () => {
    renderWithProviders(
      <LearnersModal courseId="course-v1:Org+Course+Run" badgeId={null} badgeName="" onClose={jest.fn()} />,
    );
    expect(mockedApi.fetchBadgeLearners).not.toHaveBeenCalled();
  });
});

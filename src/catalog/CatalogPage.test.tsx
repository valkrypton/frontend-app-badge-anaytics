import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@src/test-utils';
import CatalogPage from './CatalogPage';
import * as api from './api';

jest.mock('./api');

describe('CatalogPage', () => {
  const mockedApi = api as jest.Mocked<typeof api>;
  const route = { route: '/course/course-v1:Org+Course+Run', path: '/course/:courseId' };

  it('shows the empty state when there are no badges', async () => {
    mockedApi.fetchBadges.mockResolvedValue({ badges: [] });

    renderWithProviders(<CatalogPage />, route);

    expect(await screen.findByText('No badges yet — add one below.')).toBeInTheDocument();
  });

  it('lists existing badges and deletes one on click', async () => {
    mockedApi.fetchBadges.mockResolvedValue({
      badges: [{
        id: 1, name: 'Great Job', description: 'You did it', image: null,
      }],
    });
    mockedApi.deleteBadge.mockResolvedValue(undefined);
    const user = userEvent.setup();

    renderWithProviders(<CatalogPage />, route);

    expect(await screen.findByText('Great Job')).toBeInTheDocument();
    await user.click(screen.getByText('Delete'));

    expect(mockedApi.deleteBadge).toHaveBeenCalledWith('course-v1:Org+Course+Run', 1);
  });

  it('creates a badge via the form', async () => {
    mockedApi.fetchBadges.mockResolvedValue({ badges: [] });
    mockedApi.createBadge.mockResolvedValue({
      id: 2, name: 'New Badge', description: '', image: null,
    });
    const user = userEvent.setup();

    renderWithProviders(<CatalogPage />, route);

    await screen.findByText('No badges yet — add one below.');
    await user.type(screen.getByLabelText('Name'), 'New Badge');
    await user.click(screen.getByText('Save'));

    expect(mockedApi.createBadge).toHaveBeenCalledWith(
      'course-v1:Org+Course+Run',
      { name: 'New Badge', description: '', image: null },
    );
  });
});

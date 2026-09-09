import { screen } from '@testing-library/react';
import { renderWithProviders } from '@src/test-utils';
import ConfigurePage from './ConfigurePage';
import * as configureApi from './api';
import * as catalogApi from '../catalog/api';
import { CourseOutlineResponse } from './types';

jest.mock('./api');
jest.mock('../catalog/api');

describe('ConfigurePage', () => {
  const mockedConfigureApi = configureApi as jest.Mocked<typeof configureApi>;
  const mockedCatalogApi = catalogApi as jest.Mocked<typeof catalogApi>;
  const route = { route: '/course/course-v1:Org+Course+Run', path: '/course/:courseId' };

  it('renders the outline tree once loaded', async () => {
    const response: CourseOutlineResponse = {
      chapters: [{
        usageKey: 'chapter-1',
        displayName: 'Week 1',
        badgeEnabled: false,
        badgeId: null,
        children: [],
      }],
    };
    mockedConfigureApi.fetchCourseOutline.mockResolvedValue(response);
    mockedCatalogApi.fetchBadges.mockResolvedValue({ badges: [] });

    renderWithProviders(<ConfigurePage />, route);

    expect(await screen.findByText(/Week 1/)).toBeInTheDocument();
  });

  it('shows an error state when the outline request fails', async () => {
    mockedConfigureApi.fetchCourseOutline.mockRejectedValue(new Error('network error'));
    mockedCatalogApi.fetchBadges.mockResolvedValue({ badges: [] });

    renderWithProviders(<ConfigurePage />, route);

    expect(await screen.findByText('Could not load the course outline. Please try again.')).toBeInTheDocument();
  });
});

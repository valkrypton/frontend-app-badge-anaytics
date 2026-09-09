jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  getAuthenticatedHttpClient: jest.fn(),
  getSiteConfig: jest.fn(),
}));

import { getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';
import {
  createBadge, deleteBadge, fetchBadges, updateBadge,
} from './api';

describe('catalog/api', () => {
  const courseId = 'course-v1:Org+Course+Run';
  const badgeResponse = {
    id: 1, name: 'Great Job', description: 'You did it', image: null,
  };
  const mockGet = jest.fn();
  const mockPost = jest.fn();
  const mockPut = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
    mockPut.mockReset();
    mockDelete.mockReset();
    (getAuthenticatedHttpClient as jest.Mock).mockReturnValue({
      get: mockGet, post: mockPost, put: mockPut, delete: mockDelete,
    });
    (getSiteConfig as jest.Mock).mockReturnValue({ cmsBaseUrl: 'http://studio.local.openedx.io:8001' });
  });

  it('fetches the badge list', async () => {
    mockGet.mockResolvedValue({ data: { badges: [badgeResponse] } });

    const result = await fetchBadges(courseId);

    expect(result).toEqual({ badges: [badgeResponse] });
  });

  it('creates a badge with multipart form data', async () => {
    mockPost.mockResolvedValue({ data: badgeResponse });

    const result = await createBadge(courseId, { name: 'Great Job', description: 'You did it' });

    expect(mockPost).toHaveBeenCalledTimes(1);
    const [url, body] = mockPost.mock.calls[0];
    expect(url).toContain('/badges/api/course/');
    expect(body).toBeInstanceOf(FormData);
    expect(result).toEqual(badgeResponse);
  });

  it('updates a badge with multipart form data', async () => {
    mockPut.mockResolvedValue({ data: badgeResponse });

    await updateBadge(courseId, 1, { name: 'Great Job', description: 'You did it' });

    expect(mockPut).toHaveBeenCalledTimes(1);
    const [url, body] = mockPut.mock.calls[0];
    expect(url).toContain('/badges/api/course/');
    expect(body).toBeInstanceOf(FormData);
  });

  it('deletes a badge', async () => {
    mockDelete.mockResolvedValue({});

    await deleteBadge(courseId, 1);

    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@src/test-utils';
import OutlineTreeNode from './OutlineTreeNode';
import * as api from './api';
import { OutlineNode } from './types';

jest.mock('./api');

describe('OutlineTreeNode', () => {
  const mockedApi = api as jest.Mocked<typeof api>;
  const badges = [{ id: 1, name: 'Great Job' }];

  const node: OutlineNode = {
    usageKey: 'chapter-1',
    displayName: 'Week 1',
    badgeEnabled: false,
    badgeId: null,
    children: [{
      usageKey: 'seq-1',
      displayName: 'Lesson 1',
      badgeEnabled: true,
      badgeId: 1,
      children: [],
    }],
  };

  it('renders the node and its children with the right checked/selected state', () => {
    renderWithProviders(
      <OutlineTreeNode node={node} depth={0} badges={badges} courseId="course-v1:Org+Course+Run" />,
    );

    expect(screen.getByText(/Week 1/)).toBeInTheDocument();
    expect(screen.getByText(/Lesson 1/)).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(checkboxes[0].checked).toBe(false);
    expect(checkboxes[1].checked).toBe(true);
  });

  it('posts the new config when the checkbox is toggled', async () => {
    mockedApi.setBlockBadgeConfig.mockResolvedValue(undefined);
    const user = userEvent.setup();

    renderWithProviders(
      <OutlineTreeNode node={node} depth={0} badges={badges} courseId="course-v1:Org+Course+Run" />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    expect(mockedApi.setBlockBadgeConfig).toHaveBeenCalledWith('chapter-1', true, null);
  });
});

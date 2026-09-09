import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Form } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { setBlockBadgeConfig } from './api';
import { OutlineNode } from './types';
import messages from './messages';

interface Props {
  node: OutlineNode,
  depth: number,
  badges: { id: number, name: string }[],
  courseId: string,
}

const OutlineTreeNode = ({
  node, depth, badges, courseId,
}: Props) => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: { badgeEnabled: boolean, badgeId: number | null }) => (
      setBlockBadgeConfig(node.usageKey, input.badgeEnabled, input.badgeId)
    ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['badge-outline', courseId] }),
  });

  const knownBadgeIds = new Set(badges.map((badge) => badge.id));
  const badgeIdIsUnknown = node.badgeId !== null && !knownBadgeIds.has(node.badgeId);

  return (
    <div style={{ marginLeft: depth * 24 }}>
      <Form.Checkbox
        checked={node.badgeEnabled}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
          mutation.mutate({ badgeEnabled: event.target.checked, badgeId: node.badgeId })
        )}
      >
        {node.displayName}
        {' — '}
        {formatMessage(messages['badges.configure.badgeEnabledLabel'])}
      </Form.Checkbox>
      <Form.Control
        as="select"
        disabled={!node.badgeEnabled}
        value={node.badgeId ?? ''}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = event.target;
          mutation.mutate({ badgeEnabled: node.badgeEnabled, badgeId: value === '' ? null : Number(value) });
        }}
      >
        <option value="">{formatMessage(messages['badges.configure.badgePickerNoneOption'])}</option>
        {badgeIdIsUnknown && (
          <option value={node.badgeId as number} disabled>
            {formatMessage(messages['badges.configure.deletedBadgeOption'])}
          </option>
        )}
        {badges.map((badge) => (
          <option key={badge.id} value={badge.id}>{badge.name}</option>
        ))}
      </Form.Control>
      {node.children.map((child) => (
        <OutlineTreeNode key={child.usageKey} node={child} depth={depth + 1} badges={badges} courseId={courseId} />
      ))}
    </div>
  );
};

export default OutlineTreeNode;

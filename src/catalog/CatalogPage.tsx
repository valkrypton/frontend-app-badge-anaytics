import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Alert, Button, Container, Spinner,
} from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import {
  createBadge, deleteBadge, fetchBadges, updateBadge,
} from './api';
import { Badge, BadgeInput } from './types';
import BadgeForm from './BadgeForm';
import messages from './messages';

const CatalogPage = () => {
  const { formatMessage } = useIntl();
  const { courseId } = useParams<{ courseId: string }>();
  const queryClient = useQueryClient();
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null);

  const badgesQuery = useQuery({
    queryKey: ['badges', courseId],
    queryFn: () => fetchBadges(courseId as string),
    enabled: courseId !== undefined,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['badges', courseId] });

  const createMutation = useMutation({
    mutationFn: (input: BadgeInput) => createBadge(courseId as string, input),
    onSuccess: invalidate,
  });
  const updateMutation = useMutation({
    mutationFn: ({ badgeId, input }: { badgeId: number, input: BadgeInput }) => (
      updateBadge(courseId as string, badgeId, input)
    ),
    onSuccess: () => {
      invalidate();
      setEditingBadge(null);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (badgeId: number) => deleteBadge(courseId as string, badgeId),
    onSuccess: invalidate,
  });

  return (
    <Container className="py-5">
      <h1 className="mb-4">{formatMessage(messages['badges.catalog.heading'])}</h1>
      {badgesQuery.isLoading && (
        <Spinner animation="border" screenReaderText={formatMessage(messages['badges.catalog.loading'])} />
      )}
      {badgesQuery.isError && <Alert variant="danger">{formatMessage(messages['badges.catalog.error'])}</Alert>}
      {(createMutation.isError || updateMutation.isError) && (
        <Alert variant="danger">{formatMessage(messages['badges.catalog.saveError'])}</Alert>
      )}
      {badgesQuery.data && badgesQuery.data.badges.length === 0 && (
        <p>{formatMessage(messages['badges.catalog.empty'])}</p>
      )}
      {badgesQuery.data && badgesQuery.data.badges.map((badge) => (
        <div key={badge.id} className="mb-3">
          {editingBadge?.id === badge.id ? (
            <BadgeForm
              initialValues={badge}
              onSubmit={(input) => updateMutation.mutate({ badgeId: badge.id, input })}
              onCancel={() => setEditingBadge(null)}
            />
          ) : (
            <>
              <strong>{badge.name}</strong>
              {' — '}
              {badge.description}
              <Button variant="tertiary" onClick={() => setEditingBadge(badge)}>
                {formatMessage(messages['badges.catalog.editButton'])}
              </Button>
              <Button variant="tertiary" onClick={() => deleteMutation.mutate(badge.id)}>
                {formatMessage(messages['badges.catalog.deleteButton'])}
              </Button>
            </>
          )}
        </div>
      ))}
      <h2 className="mt-4">{formatMessage(messages['badges.catalog.addButton'])}</h2>
      <BadgeForm onSubmit={(input) => createMutation.mutate(input)} />
    </Container>
  );
};

export default CatalogPage;

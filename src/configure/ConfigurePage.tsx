import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Alert, Container, Spinner } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { fetchCourseOutline } from './api';
import { fetchBadges } from '../catalog/api';
import OutlineTreeNode from './OutlineTreeNode';
import messages from './messages';

const ConfigurePage = () => {
  const { formatMessage } = useIntl();
  const { courseId } = useParams<{ courseId: string }>();

  const outlineQuery = useQuery({
    queryKey: ['badge-outline', courseId],
    queryFn: () => fetchCourseOutline(courseId as string),
    enabled: courseId !== undefined,
  });
  const badgesQuery = useQuery({
    queryKey: ['badges', courseId],
    queryFn: () => fetchBadges(courseId as string),
    enabled: courseId !== undefined,
  });

  const isLoading = outlineQuery.isLoading || badgesQuery.isLoading;
  const isError = outlineQuery.isError || badgesQuery.isError;

  return (
    <Container className="py-5">
      <h1 className="mb-4">{formatMessage(messages['badges.configure.heading'])}</h1>
      {isLoading && (
        <Spinner animation="border" screenReaderText={formatMessage(messages['badges.configure.loading'])} />
      )}
      {isError && <Alert variant="danger">{formatMessage(messages['badges.configure.error'])}</Alert>}
      {badgesQuery.data && badgesQuery.data.badges.length === 0 && (
        <Alert variant="info">{formatMessage(messages['badges.configure.emptyCatalogHint'])}</Alert>
      )}
      {outlineQuery.data && courseId && (
        outlineQuery.data.chapters.map((chapter) => (
          <OutlineTreeNode
            key={chapter.usageKey}
            node={chapter}
            depth={0}
            badges={badgesQuery.data?.badges ?? []}
            courseId={courseId}
          />
        ))
      )}
    </Container>
  );
};

export default ConfigurePage;

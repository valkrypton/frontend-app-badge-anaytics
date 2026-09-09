import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Alert, Container, Spinner } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { fetchCourseBadgeStats } from './api';
import SummaryTable from './SummaryTable';
import messages from './messages';

const StatsPage = () => {
  const { formatMessage } = useIntl();
  const { courseId } = useParams<{ courseId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['badge-stats', courseId],
    queryFn: () => fetchCourseBadgeStats(courseId as string),
    enabled: courseId !== undefined,
  });

  return (
    <Container className="py-5">
      <h1>{formatMessage(messages['badgeAnalytics.heading'])}</h1>
      {isLoading && (
        <Spinner animation="border" screenReaderText={formatMessage(messages['badgeAnalytics.loading'])} />
      )}
      {isError && <Alert variant="danger">{formatMessage(messages['badgeAnalytics.summary.error'])}</Alert>}
      {data && data.badges.length === 0 && (
        <p>{formatMessage(messages['badgeAnalytics.summary.empty'])}</p>
      )}
      {data && data.badges.length > 0 && courseId && (
        <SummaryTable courseId={courseId} badges={data.badges} />
      )}
    </Container>
  );
};

export default StatsPage;

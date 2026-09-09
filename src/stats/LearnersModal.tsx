import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, Button, ModalDialog, Spinner } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { fetchBadgeLearners, getBadgeLearnersUrl } from './api';
import messages from './messages';
import { DATE_ONLY_FORMAT } from './dateUtils';

interface Props {
  courseId: string;
  badgeId: number | null;
  badgeName: string;
  onClose: () => void;
}

const LearnersModal = ({ courseId, badgeId, badgeName, onClose }: Props) => {
  const { formatMessage, formatDate } = useIntl();
  const [url, setUrl] = useState<string | null>(null);
  const activeUrl = badgeId !== null ? (url ?? getBadgeLearnersUrl(courseId, badgeId)) : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['badge-learners', activeUrl],
    queryFn: () => fetchBadgeLearners(activeUrl as string),
    enabled: activeUrl !== null,
  });

  const handleClose = () => {
    setUrl(null);
    onClose();
  };

  const title = formatMessage(messages['badges.analytics.learners.title'], { badgeName });

  return (
    <ModalDialog
      title={title}
      isOpen={badgeId !== null}
      onClose={handleClose}
      hasCloseButton
      isOverflowVisible={false}
      size="lg"
    >
      <ModalDialog.Header>
        <ModalDialog.Title>{title}</ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        {isLoading && (
          <Spinner animation="border" screenReaderText={formatMessage(messages['badges.analytics.loading'])} />
        )}
        {isError && <Alert variant="danger">{formatMessage(messages['badges.analytics.learners.error'])}</Alert>}
        {data && (
          <>
            <table className="table badges-modal-table">
              <thead>
                <tr>
                  <th>{formatMessage(messages['badges.analytics.learners.learnerColumn'])}</th>
                  <th>{formatMessage(messages['badges.analytics.learners.completionColumn'])}</th>
                  <th>{formatMessage(messages['badges.analytics.learners.earnedColumn'])}</th>
                  <th>{formatMessage(messages['badges.analytics.learners.awardedAtColumn'])}</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((row) => (
                  <tr key={row.userId}>
                    <td>{row.username}</td>
                    <td>{row.completionPercent}%</td>
                    <td>
                      {row.earned
                        ? formatMessage(messages['badges.analytics.learners.earnedYes'])
                        : formatMessage(messages['badges.analytics.learners.earnedNo'])}
                    </td>
                    <td>{row.awardedAt ? formatDate(row.awardedAt, DATE_ONLY_FORMAT) : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button variant="tertiary" disabled={!data.previous} onClick={() => setUrl(data.previous)}>
              {formatMessage(messages['badges.analytics.learners.previous'])}
            </Button>
            <Button variant="tertiary" disabled={!data.next} onClick={() => setUrl(data.next)}>
              {formatMessage(messages['badges.analytics.learners.next'])}
            </Button>
          </>
        )}
      </ModalDialog.Body>
    </ModalDialog>
  );
};

export default LearnersModal;

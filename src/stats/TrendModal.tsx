import { ModalDialog } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { BadgeStats } from './types';
import messages from './messages';
import { DATE_ONLY_FORMAT } from './dateUtils';

interface Props {
  badge: BadgeStats | null;
  onClose: () => void;
}

const TrendModal = ({ badge, onClose }: Props) => {
  const { formatMessage, formatDate } = useIntl();
  const title = badge ? formatMessage(messages['badges.analytics.trend.title'], { badgeName: badge.badgeName }) : '';

  return (
    <ModalDialog
      title={title}
      isOpen={badge !== null}
      onClose={onClose}
      hasCloseButton
      isOverflowVisible={false}
      size="lg"
    >
      <ModalDialog.Header>
        <ModalDialog.Title>{title}</ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        {badge && (
          <table className="table badges-modal-table">
            <thead>
              <tr>
                <th>{formatMessage(messages['badges.analytics.trend.dateColumn'])}</th>
                <th>{formatMessage(messages['badges.analytics.trend.awardsColumn'])}</th>
              </tr>
            </thead>
            <tbody>
              {badge.dailyCounts.map((row) => (
                <tr key={row.date}>
                  <td>{formatDate(row.date, DATE_ONLY_FORMAT)}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </ModalDialog.Body>
    </ModalDialog>
  );
};

export default TrendModal;

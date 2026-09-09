import { ModalDialog } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { BadgeStats } from './types';
import messages from './messages';

interface Props {
  badge: BadgeStats | null;
  onClose: () => void;
}

const TrendModal = ({ badge, onClose }: Props) => {
  const { formatMessage } = useIntl();
  const title = badge ? formatMessage(messages['badgeAnalytics.trend.title'], { badgeName: badge.badgeName }) : '';

  return (
    <ModalDialog title={title} isOpen={badge !== null} onClose={onClose} hasCloseButton isOverflowVisible={false}>
      <ModalDialog.Header>
        <ModalDialog.Title>{title}</ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        {badge && (
          <table className="table">
            <thead>
              <tr>
                <th>{formatMessage(messages['badgeAnalytics.trend.dateColumn'])}</th>
                <th>{formatMessage(messages['badgeAnalytics.trend.awardsColumn'])}</th>
              </tr>
            </thead>
            <tbody>
              {badge.dailyCounts.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
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

import { useState } from 'react';
import { Button } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { BadgeStats } from './types';
import TrendModal from './TrendModal';
import LearnersModal from './LearnersModal';
import messages from './messages';

interface Props {
  courseId: string;
  badges: BadgeStats[];
}

const SummaryTable = ({ courseId, badges }: Props) => {
  const { formatMessage } = useIntl();
  const [trendBadge, setTrendBadge] = useState<BadgeStats | null>(null);
  const [learnersBadge, setLearnersBadge] = useState<BadgeStats | null>(null);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>{formatMessage(messages['badgeAnalytics.summary.badgeColumn'])}</th>
            <th>{formatMessage(messages['badgeAnalytics.summary.enrolledColumn'])}</th>
            <th>{formatMessage(messages['badgeAnalytics.summary.completedColumn'])}</th>
            <th>{formatMessage(messages['badgeAnalytics.summary.awardedColumn'])}</th>
            <th>{formatMessage(messages['badgeAnalytics.summary.rateColumn'])}</th>
            <th>{formatMessage(messages['badgeAnalytics.summary.updatedColumn'])}</th>
            <th aria-hidden="true" />
          </tr>
        </thead>
        <tbody>
          {badges.map((badge) => (
            <tr key={badge.badgeId}>
              <td>{badge.badgeName}</td>
              <td>{badge.totalEnrolled}</td>
              <td>{badge.totalCompletedBlock}</td>
              <td>{badge.totalAwarded}</td>
              <td>{badge.awardRatePercent}%</td>
              <td>{badge.computedAt}</td>
              <td>
                <Button variant="tertiary" onClick={() => setTrendBadge(badge)}>
                  {formatMessage(messages['badgeAnalytics.summary.viewTrend'])}
                </Button>
                <Button variant="tertiary" onClick={() => setLearnersBadge(badge)}>
                  {formatMessage(messages['badgeAnalytics.summary.viewLearners'])}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TrendModal badge={trendBadge} onClose={() => setTrendBadge(null)} />
      <LearnersModal
        courseId={courseId}
        badgeId={learnersBadge ? learnersBadge.badgeId : null}
        badgeName={learnersBadge ? learnersBadge.badgeName : ''}
        onClose={() => setLearnersBadge(null)}
      />
    </>
  );
};

export default SummaryTable;

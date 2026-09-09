import { Fragment, useState } from 'react';
import { Button } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { BadgeStats } from './types';
import TrendModal from './TrendModal';
import LearnersModal from './LearnersModal';
import messages from './messages';

interface Props {
  courseId: string,
  badges: BadgeStats[],
}

const SummaryTable = ({ courseId, badges }: Props) => {
  const { formatMessage } = useIntl();
  const [trendBadge, setTrendBadge] = useState<BadgeStats | null>(null);
  const [learnersBadge, setLearnersBadge] = useState<BadgeStats | null>(null);

  return (
    <>
      <table className="table badges-summary-table">
        <thead>
          <tr>
            <th>{formatMessage(messages['badges.analytics.summary.badgeColumn'])}</th>
            <th>{formatMessage(messages['badges.analytics.summary.enrolledColumn'])}</th>
            <th>{formatMessage(messages['badges.analytics.summary.awardedColumn'])}</th>
            <th>{formatMessage(messages['badges.analytics.summary.rateColumn'])}</th>
          </tr>
        </thead>
        <tbody>
          {badges.map((badge) => (
            <Fragment key={badge.badgeId}>
              <tr>
                <td>{badge.badgeName}</td>
                <td>{badge.totalEnrolled}</td>
                <td>{badge.totalAwarded}</td>
                <td>{badge.awardRatePercent}%</td>
              </tr>
              <tr>
                <td colSpan={4} className="badges-summary-table__actions">
                  <Button variant="tertiary" onClick={() => setTrendBadge(badge)}>
                    {formatMessage(messages['badges.analytics.summary.viewTrend'])}
                  </Button>
                  <Button variant="tertiary" onClick={() => setLearnersBadge(badge)}>
                    {formatMessage(messages['badges.analytics.summary.viewLearners'])}
                  </Button>
                </td>
              </tr>
            </Fragment>
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

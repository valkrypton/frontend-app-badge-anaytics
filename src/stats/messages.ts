import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  'badges.analytics.trend.title': {
    id: 'badges.analytics.trend.title',
    defaultMessage: '{badgeName} — awards per day',
    description: 'Title of the per-badge award trend modal',
  },
  'badges.analytics.trend.dateColumn': {
    id: 'badges.analytics.trend.dateColumn',
    defaultMessage: 'Date',
    description: 'Column header for the trend table date column',
  },
  'badges.analytics.trend.awardsColumn': {
    id: 'badges.analytics.trend.awardsColumn',
    defaultMessage: 'Awards',
    description: 'Column header for the trend table award-count column',
  },
  'badges.analytics.learners.title': {
    id: 'badges.analytics.learners.title',
    defaultMessage: '{badgeName} — learner progress',
    description: 'Title of the per-badge learner progress modal',
  },
  'badges.analytics.learners.error': {
    id: 'badges.analytics.learners.error',
    defaultMessage: 'Could not load learner progress. Please try again.',
    description: 'Error shown when the learner progress request fails',
  },
  'badges.analytics.learners.learnerColumn': {
    id: 'badges.analytics.learners.learnerColumn',
    defaultMessage: 'Learner',
    description: 'Column header for the learner progress table username column',
  },
  'badges.analytics.learners.completionColumn': {
    id: 'badges.analytics.learners.completionColumn',
    defaultMessage: 'Completion',
    description: 'Column header for the learner progress table completion-percent column',
  },
  'badges.analytics.learners.earnedColumn': {
    id: 'badges.analytics.learners.earnedColumn',
    defaultMessage: 'Earned',
    description: 'Column header for the learner progress table earned column',
  },
  'badges.analytics.learners.awardedAtColumn': {
    id: 'badges.analytics.learners.awardedAtColumn',
    defaultMessage: 'Awarded at',
    description: 'Column header for the learner progress table awarded-at column',
  },
  'badges.analytics.learners.earnedYes': {
    id: 'badges.analytics.learners.earnedYes',
    defaultMessage: 'Yes',
    description: 'Shown in the learner progress table when the learner has earned the badge',
  },
  'badges.analytics.learners.earnedNo': {
    id: 'badges.analytics.learners.earnedNo',
    defaultMessage: 'No',
    description: 'Shown in the learner progress table when the learner has not earned the badge',
  },
  'badges.analytics.learners.previous': {
    id: 'badges.analytics.learners.previous',
    defaultMessage: 'Previous',
    description: 'Button to go to the previous page of learner progress',
  },
  'badges.analytics.learners.next': {
    id: 'badges.analytics.learners.next',
    defaultMessage: 'Next',
    description: 'Button to go to the next page of learner progress',
  },
  'badges.analytics.loading': {
    id: 'badges.analytics.loading',
    defaultMessage: 'Loading…',
    description: 'Screen-reader text for loading spinners on the badge analytics page',
  },
  'badges.analytics.summary.badgeColumn': {
    id: 'badges.analytics.summary.badgeColumn',
    defaultMessage: 'Badge',
    description: 'Column header for the summary table badge-name column',
  },
  'badges.analytics.summary.enrolledColumn': {
    id: 'badges.analytics.summary.enrolledColumn',
    defaultMessage: 'Enrolled',
    description: 'Column header for the summary table enrolled-count column',
  },
  'badges.analytics.summary.completedColumn': {
    id: 'badges.analytics.summary.completedColumn',
    defaultMessage: 'Completed block',
    description: 'Column header for the summary table completed-block-count column',
  },
  'badges.analytics.summary.awardedColumn': {
    id: 'badges.analytics.summary.awardedColumn',
    defaultMessage: 'Awarded',
    description: 'Column header for the summary table awarded-count column',
  },
  'badges.analytics.summary.rateColumn': {
    id: 'badges.analytics.summary.rateColumn',
    defaultMessage: 'Award rate',
    description: 'Column header for the summary table award-rate column',
  },
  'badges.analytics.summary.viewTrend': {
    id: 'badges.analytics.summary.viewTrend',
    defaultMessage: 'View trend',
    description: 'Button to open the award trend modal for a badge',
  },
  'badges.analytics.summary.viewLearners': {
    id: 'badges.analytics.summary.viewLearners',
    defaultMessage: 'View learners',
    description: 'Button to open the learner progress modal for a badge',
  },
  'badges.analytics.heading': {
    id: 'badges.analytics.heading',
    defaultMessage: 'Badge Analytics',
    description: 'Page heading for the badge analytics page',
  },
  'badges.analytics.summary.error': {
    id: 'badges.analytics.summary.error',
    defaultMessage: 'Could not load badge stats. Please try again.',
    description: 'Error shown when the badge summary request fails',
  },
  'badges.analytics.summary.empty': {
    id: 'badges.analytics.summary.empty',
    defaultMessage: 'No badge stats yet — they appear after the next scheduled refresh.',
    description: 'Shown when badges exist but no stats have been computed yet',
  },
});

export default messages;

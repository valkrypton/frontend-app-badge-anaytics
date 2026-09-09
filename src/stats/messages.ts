import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  'badgeAnalytics.trend.title': {
    id: 'badgeAnalytics.trend.title',
    defaultMessage: '{badgeName} — awards per day',
    description: 'Title of the per-badge award trend modal',
  },
  'badgeAnalytics.trend.dateColumn': {
    id: 'badgeAnalytics.trend.dateColumn',
    defaultMessage: 'Date',
    description: 'Column header for the trend table date column',
  },
  'badgeAnalytics.trend.awardsColumn': {
    id: 'badgeAnalytics.trend.awardsColumn',
    defaultMessage: 'Awards',
    description: 'Column header for the trend table award-count column',
  },
  'badgeAnalytics.learners.title': {
    id: 'badgeAnalytics.learners.title',
    defaultMessage: '{badgeName} — learner progress',
    description: 'Title of the per-badge learner progress modal',
  },
  'badgeAnalytics.learners.error': {
    id: 'badgeAnalytics.learners.error',
    defaultMessage: 'Could not load learner progress. Please try again.',
    description: 'Error shown when the learner progress request fails',
  },
  'badgeAnalytics.learners.learnerColumn': {
    id: 'badgeAnalytics.learners.learnerColumn',
    defaultMessage: 'Learner',
    description: 'Column header for the learner progress table username column',
  },
  'badgeAnalytics.learners.completionColumn': {
    id: 'badgeAnalytics.learners.completionColumn',
    defaultMessage: 'Completion',
    description: 'Column header for the learner progress table completion-percent column',
  },
  'badgeAnalytics.learners.earnedColumn': {
    id: 'badgeAnalytics.learners.earnedColumn',
    defaultMessage: 'Earned',
    description: 'Column header for the learner progress table earned column',
  },
  'badgeAnalytics.learners.awardedAtColumn': {
    id: 'badgeAnalytics.learners.awardedAtColumn',
    defaultMessage: 'Awarded at',
    description: 'Column header for the learner progress table awarded-at column',
  },
  'badgeAnalytics.learners.earnedYes': {
    id: 'badgeAnalytics.learners.earnedYes',
    defaultMessage: 'Yes',
    description: 'Shown in the learner progress table when the learner has earned the badge',
  },
  'badgeAnalytics.learners.earnedNo': {
    id: 'badgeAnalytics.learners.earnedNo',
    defaultMessage: 'No',
    description: 'Shown in the learner progress table when the learner has not earned the badge',
  },
  'badgeAnalytics.learners.previous': {
    id: 'badgeAnalytics.learners.previous',
    defaultMessage: 'Previous',
    description: 'Button to go to the previous page of learner progress',
  },
  'badgeAnalytics.learners.next': {
    id: 'badgeAnalytics.learners.next',
    defaultMessage: 'Next',
    description: 'Button to go to the next page of learner progress',
  },
  'badgeAnalytics.loading': {
    id: 'badgeAnalytics.loading',
    defaultMessage: 'Loading…',
    description: 'Screen-reader text for loading spinners on the badge analytics page',
  },
  'badgeAnalytics.summary.badgeColumn': {
    id: 'badgeAnalytics.summary.badgeColumn',
    defaultMessage: 'Badge',
    description: 'Column header for the summary table badge-name column',
  },
  'badgeAnalytics.summary.enrolledColumn': {
    id: 'badgeAnalytics.summary.enrolledColumn',
    defaultMessage: 'Enrolled',
    description: 'Column header for the summary table enrolled-count column',
  },
  'badgeAnalytics.summary.completedColumn': {
    id: 'badgeAnalytics.summary.completedColumn',
    defaultMessage: 'Completed block',
    description: 'Column header for the summary table completed-block-count column',
  },
  'badgeAnalytics.summary.awardedColumn': {
    id: 'badgeAnalytics.summary.awardedColumn',
    defaultMessage: 'Awarded',
    description: 'Column header for the summary table awarded-count column',
  },
  'badgeAnalytics.summary.rateColumn': {
    id: 'badgeAnalytics.summary.rateColumn',
    defaultMessage: 'Award rate',
    description: 'Column header for the summary table award-rate column',
  },
  'badgeAnalytics.summary.updatedColumn': {
    id: 'badgeAnalytics.summary.updatedColumn',
    defaultMessage: 'Last updated',
    description: 'Column header for the summary table last-updated column',
  },
  'badgeAnalytics.summary.viewTrend': {
    id: 'badgeAnalytics.summary.viewTrend',
    defaultMessage: 'View trend',
    description: 'Button to open the award trend modal for a badge',
  },
  'badgeAnalytics.summary.viewLearners': {
    id: 'badgeAnalytics.summary.viewLearners',
    defaultMessage: 'View learners',
    description: 'Button to open the learner progress modal for a badge',
  },
  'badgeAnalytics.heading': {
    id: 'badgeAnalytics.heading',
    defaultMessage: 'Badge Analytics',
    description: 'Page heading for the badge analytics page',
  },
  'badgeAnalytics.summary.error': {
    id: 'badgeAnalytics.summary.error',
    defaultMessage: 'Could not load badge stats. Please try again.',
    description: 'Error shown when the badge summary request fails',
  },
  'badgeAnalytics.summary.empty': {
    id: 'badgeAnalytics.summary.empty',
    defaultMessage: 'No badge stats yet — they appear after the next scheduled refresh.',
    description: 'Shown when badges exist but no stats have been computed yet',
  },
});

export default messages;

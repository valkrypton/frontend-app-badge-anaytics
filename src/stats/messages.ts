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
});

export default messages;

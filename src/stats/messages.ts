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
});

export default messages;

import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  'badges.configure.heading': {
    id: 'badges.configure.heading',
    defaultMessage: 'Configure Badges',
    description: 'Page heading for the badge configuration screen',
  },
  'badges.configure.loading': {
    id: 'badges.configure.loading',
    defaultMessage: 'Loading…',
    description: 'Screen-reader text for the loading spinner on the configure screen',
  },
  'badges.configure.error': {
    id: 'badges.configure.error',
    defaultMessage: 'Could not load the course outline. Please try again.',
    description: 'Error shown when the outline request fails',
  },
  'badges.configure.emptyCatalogHint': {
    id: 'badges.configure.emptyCatalogHint',
    defaultMessage: 'No badges exist yet — add one on the Catalog tab before enabling badges here.',
    description: 'Shown on the configure screen when the badge catalog is empty',
  },
  'badges.configure.badgeEnabledLabel': {
    id: 'badges.configure.badgeEnabledLabel',
    defaultMessage: 'Award a badge when this is completed',
    description: 'Checkbox label for enabling a badge on a course block',
  },
  'badges.configure.badgePickerNoneOption': {
    id: 'badges.configure.badgePickerNoneOption',
    defaultMessage: '— select a badge —',
    description: 'Placeholder option in the badge picker dropdown',
  },
  'badges.configure.deletedBadgeOption': {
    id: 'badges.configure.deletedBadgeOption',
    defaultMessage: '(deleted badge)',
    description: 'Shown in the badge picker when the configured badge no longer exists in the catalog',
  },
});

export default messages;

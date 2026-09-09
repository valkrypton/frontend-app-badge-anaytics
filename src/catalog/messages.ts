import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  'badges.catalog.heading': {
    id: 'badges.catalog.heading',
    defaultMessage: 'Badge Catalog',
    description: 'Page heading for the badge catalog screen',
  },
  'badges.catalog.loading': {
    id: 'badges.catalog.loading',
    defaultMessage: 'Loading…',
    description: 'Screen-reader text for the loading spinner on the catalog screen',
  },
  'badges.catalog.error': {
    id: 'badges.catalog.error',
    defaultMessage: 'Could not load the badge catalog. Please try again.',
    description: 'Error shown when the badge list request fails',
  },
  'badges.catalog.saveError': {
    id: 'badges.catalog.saveError',
    defaultMessage: 'Could not save the badge. Please check the form and try again.',
    description: 'Error shown when creating or updating a badge fails',
  },
  'badges.catalog.empty': {
    id: 'badges.catalog.empty',
    defaultMessage: 'No badges yet — add one below.',
    description: 'Shown when the catalog has no badges',
  },
  'badges.catalog.nameLabel': {
    id: 'badges.catalog.nameLabel',
    defaultMessage: 'Name',
    description: 'Label for the badge name field',
  },
  'badges.catalog.descriptionLabel': {
    id: 'badges.catalog.descriptionLabel',
    defaultMessage: 'Description',
    description: 'Label for the badge description field',
  },
  'badges.catalog.imageLabel': {
    id: 'badges.catalog.imageLabel',
    defaultMessage: 'Image',
    description: 'Label for the badge image upload field',
  },
  'badges.catalog.saveButton': {
    id: 'badges.catalog.saveButton',
    defaultMessage: 'Save',
    description: 'Button to submit the badge form',
  },
  'badges.catalog.cancelButton': {
    id: 'badges.catalog.cancelButton',
    defaultMessage: 'Cancel',
    description: 'Button to cancel editing a badge',
  },
  'badges.catalog.addButton': {
    id: 'badges.catalog.addButton',
    defaultMessage: 'Add badge',
    description: 'Button to open the add-new-badge form',
  },
  'badges.catalog.editButton': {
    id: 'badges.catalog.editButton',
    defaultMessage: 'Edit',
    description: 'Button to edit an existing badge',
  },
  'badges.catalog.deleteButton': {
    id: 'badges.catalog.deleteButton',
    defaultMessage: 'Delete',
    description: 'Button to delete a badge',
  },
});

export default messages;

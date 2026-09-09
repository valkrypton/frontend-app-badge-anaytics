import { useState } from 'react';
import { Button, Form } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { Badge, BadgeInput } from './types';
import messages from './messages';

interface Props {
  initialValues?: Badge;
  onSubmit: (input: BadgeInput) => void;
  onCancel?: () => void;
}

const BadgeForm = ({ initialValues, onSubmit, onCancel }: Props) => {
  const { formatMessage } = useIntl();
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, description, image });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId={`badge-name-${initialValues?.id ?? 'new'}`}>
        <Form.Label>{formatMessage(messages['badges.catalog.nameLabel'])}</Form.Label>
        <Form.Control
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId={`badge-description-${initialValues?.id ?? 'new'}`}>
        <Form.Label>{formatMessage(messages['badges.catalog.descriptionLabel'])}</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId={`badge-image-${initialValues?.id ?? 'new'}`}>
        <Form.Label>{formatMessage(messages['badges.catalog.imageLabel'])}</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setImage(event.target.files?.[0] ?? null)}
        />
      </Form.Group>
      <Button type="submit">{formatMessage(messages['badges.catalog.saveButton'])}</Button>
      {onCancel && (
        <Button variant="tertiary" onClick={onCancel}>
          {formatMessage(messages['badges.catalog.cancelButton'])}
        </Button>
      )}
    </Form>
  );
};

export default BadgeForm;

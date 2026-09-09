import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@openedx/frontend-base';
import BadgeForm from './BadgeForm';

describe('BadgeForm', () => {
  it('submits the entered name and description', async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();

    render(
      <IntlProvider locale="en" messages={{}}>
        <BadgeForm onSubmit={onSubmit} />
      </IntlProvider>,
    );

    await user.type(screen.getByLabelText('Name'), 'Great Job');
    await user.type(screen.getByLabelText('Description'), 'You did it');
    await user.click(screen.getByText('Save'));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Great Job', description: 'You did it', image: null });
  });

  it('pre-fills fields from initialValues', () => {
    render(
      <IntlProvider locale="en" messages={{}}>
        <BadgeForm
          initialValues={{
            id: 1, name: 'Existing Badge', description: 'Already here', image: null,
          }}
          onSubmit={jest.fn()}
        />
      </IntlProvider>,
    );

    expect(screen.getByLabelText('Name')).toHaveValue('Existing Badge');
    expect(screen.getByLabelText('Description')).toHaveValue('Already here');
  });
});

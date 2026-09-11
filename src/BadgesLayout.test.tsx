import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { IntlProvider } from '@openedx/frontend-base';
import BadgesLayout from './BadgesLayout';

describe('BadgesLayout', () => {
  it('renders a tab link for each screen', () => {
    render(
      <IntlProvider locale="en" messages={{}}>
        <MemoryRouter initialEntries={['/course/course-v1:Org+Course+Run/catalog']}>
          <Routes>
            <Route path="course/:courseId" element={<BadgesLayout />}>
              <Route path="catalog" element={<div>catalog content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </IntlProvider>,
    );

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('catalog content')).toBeInTheDocument();
  });
});

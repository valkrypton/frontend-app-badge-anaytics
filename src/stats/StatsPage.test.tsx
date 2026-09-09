import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StatsPage from './StatsPage';

describe('StatsPage (placeholder)', () => {
  it('renders the course id from the route', () => {
    render(
      <MemoryRouter initialEntries={['/course/course-v1:Org+Course+Run']}>
        <Routes>
          <Route path="/course/:courseId" element={<StatsPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Badge Analytics')).toBeInTheDocument();
    expect(screen.getByText('course-v1:Org+Course+Run')).toBeInTheDocument();
  });
});

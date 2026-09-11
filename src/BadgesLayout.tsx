import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Container, Nav } from '@openedx/paragon';

const BadgesLayout = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const base = `/badges/course/${courseId}`;

  return (
    <Container className="py-3">
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link as={NavLink} to={`${base}/catalog`}>Catalog</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to={`${base}/analytics`}>Analytics</Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </Container>
  );
};

export default BadgesLayout;

import { useParams } from 'react-router-dom';

const StatsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  return (
    <div className="container py-5">
      <h1>Badge Analytics</h1>
      <p>{courseId}</p>
    </div>
  );
};

export default StatsPage;

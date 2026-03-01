import Typography from '../ui/Typography';
import Container from '../ui/Container';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CanvasView } from '../lazy';

const BlogGraphSection = async () => {
  return (
    <Container id="graph">
      <Typography variant="h2">Graph</Typography>
      <Suspense fallback={<Skeleton count={1} height={500} />}>
        <CanvasView />
      </Suspense>
    </Container>
  );
};

export default BlogGraphSection;

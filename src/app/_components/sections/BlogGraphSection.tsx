import Typography from '../ui/Typography';
import Container from '../ui/Container';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { GraphView } from '../graphView/lazy';
import { buildGraph } from '@/app/_lib/buildGraph';

const BlogGraphSection = async () => {
  const props = await buildGraph();
  return (
    <Container id="Blogs">
      <Typography variant="h2">Blogs</Typography>
      <Suspense fallback={<Skeleton count={1} height={500} />}>
        <GraphView graph={props} enableZoomAction={false} />
      </Suspense>
    </Container>
  );
};

export default BlogGraphSection;

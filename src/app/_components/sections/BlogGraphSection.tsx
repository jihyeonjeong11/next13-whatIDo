import Typography from '../ui/Typography';
import Container from '../ui/Container';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { buildGraph } from '@/app/_lib/buildGraph';
import { GraphView } from '../lazy';

const BlogGraphSection = async () => {
  const props = await buildGraph();
  return (
    <Container id="graph">
      <Typography variant="h2">Graph</Typography>
      <Suspense fallback={<Skeleton count={1} height={500} />}>
        <GraphView graph={props} enableZoomAction={false} />
      </Suspense>
    </Container>
  );
};

export default BlogGraphSection;

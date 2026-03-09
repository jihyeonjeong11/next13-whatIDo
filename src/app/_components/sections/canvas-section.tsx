import Typography from '@/components/ui/typography';
import Container from '@/components/ui/container';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CanvasView } from '../lazy';

export const CanvasSection = async () => {
  return (
    <Container id="graph">
      <Typography variant="h2">Graph</Typography>
      <Suspense fallback={<Skeleton count={1} height={500} />}>
        <CanvasView />
      </Suspense>
    </Container>
  );
};

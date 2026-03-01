import Typography from '../ui/Typography';
import Container from '../ui/Container';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CanvasView } from '../lazy';

const CanvasSection = () => {
  return (
    <Container id="roadmap">
      <Typography variant="h2">Roadmap</Typography>
      <Suspense fallback={<Skeleton count={1} height={600} />}>
        <div className="h-[600px] w-full">
          <CanvasView />
        </div>
      </Suspense>
    </Container>
  );
};

export default CanvasSection;

import { Typography } from '@/components/ui/typography';
import { Container } from '@/components/ui/container';
import { buildGraph } from '@/app/_lib/buildGraph';
import { GraphView } from '../lazy';

export const BlogGraphSection = async () => {
  const props = await buildGraph();
  return (
    <Container id="graph">
      <Typography variant="h2">Graph</Typography>
      <GraphView graph={props} enableZoomAction={false} />
    </Container>
  );
};

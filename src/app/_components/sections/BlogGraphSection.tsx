import Typography from '@/components/ui/Typography';
import Container from '@/components/ui/Container';
import { buildGraph } from '@/app/_lib/buildGraph';
import { GraphView } from '../lazy';

const BlogGraphSection = async () => {
  const props = await buildGraph();
  return (
    <Container id="graph">
      <Typography variant="h2">Graph</Typography>
      <GraphView graph={props} enableZoomAction={false} />
    </Container>
  );
};

export default BlogGraphSection;

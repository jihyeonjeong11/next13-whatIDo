import { GraphView } from '@/app/_components/lazy';
import { buildGraph } from '@/app/_lib/buildGraph';

const GraphViewPage = async () => {
  const props = await buildGraph();
  return <GraphView graph={props} />;
};

export default GraphViewPage;

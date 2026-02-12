import { GraphView } from './_components/Lazy';
import { buildGraph } from './_lib/build-graph';

const GraphViewPage = async () => {
  const props = await buildGraph();
  return <GraphView graph={props} />;
};

export default GraphViewPage;

import { GraphView } from './_components/Lazy';
import { buildGraph } from './_lib/build-graph';

const GraphViewPage = async () => {
  const props = await buildGraph();
  return (
    <div>
      <GraphView graph={props} />
    </div>
  );
};

export default GraphViewPage;

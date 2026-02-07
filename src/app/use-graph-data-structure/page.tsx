import { ASIDE_WIDTH, HEADER_HEIGHT } from '../utils/constants';
import GraphRenderer from './_components/GraphRenderer';

const UseGraphPage = () => {
  return (
    <div className={`min-h-dvh grow pt-[${HEADER_HEIGHT}px]`}>
      <GraphRenderer />
    </div>
  );
};

export default UseGraphPage;

import { HEADER_HEIGHT } from '@/app/utils/constants';
import type { FlattenedEdge } from './GraphRenderer';

const EdgesPanel = ({ edges }: { edges: FlattenedEdge[] }) => {
  return (
    <div
      className={`absolute right-4 top-[${HEADER_HEIGHT + 20}]  w-72 max-h-[70vh] overflow-y-auto z-10`}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-slate-200 p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-sm font-black text-slate-800 tracking-tight uppercase">
            Active Links
          </h2>
          <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
            {edges.length}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {edges.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs italic">
              No connections established.
            </div>
          ) : (
            edges.map((edge) => (
              <div
                key={edge.id}
                className="group p-3 rounded-xl bg-white border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all cursor-default"
              >
                <h3 className="text-sm font-bold text-slate-700 mb-1 group-hover:text-amber-600 transition-colors">
                  {edge.sTitle}
                </h3>

                <h3 className="text-sm font-bold text-slate-700 mb-1 group-hover:text-amber-600 transition-colors">
                  weight: {edge.weight}
                </h3>

                <h3 className="text-sm font-bold text-slate-700 mb-1 group-hover:text-amber-600 transition-colors">
                  {edge.tTitle}
                </h3>

                <div className="bg-slate-50 rounded-lg p-2 mt-2 border border-slate-50">
                  <p className="text-xs text-slate-500 leading-relaxed italic">"{edge.desc}"</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EdgesPanel;

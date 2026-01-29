import { useState } from 'react';
import type { NodeType } from '../_managers/GraphManager';
import { set } from 'zod';

export type EdgeProps = { weight: number; props: { desc: string } };

const DevPanel = ({
  add,
  source,
  target,
  remove,
  addEdge,
}: {
  add: (title: string) => void;
  source: NodeType | null;
  target: NodeType | null;
  remove: (id: string) => void;
  addEdge: (
    e: SubmitEvent,
    weight: string,
    desc: string,
    sourceId: string,
    targetId: string,
  ) => void;
}) => {
  const [title, setTitle] = useState('');
  const [edgeProps, setEdgeProps] = useState<EdgeProps>({
    weight: 0,
    props: {
      desc: '',
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지

    if (!title.trim()) {
      alert('노드 이름을 입력해주세요!');
      return;
    }

    add(title);
    setTitle('');
  };
  return (
    <div className="p-4 w-30 border bg-white z-auto flex flex-col gap-4">
      <h2 className="text-sm font-bold mb-4 border-b pb-2 text-gray-600">Karma Dev Panel</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="node-title" className="text-xs text-gray-400">
            Node Title
          </label>
          <input
            id="node-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your terrain name"
            className="border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded text-sm font-bold hover:bg-blue-700 transition-colors"
        >
          Add Karma Node
        </button>
      </form>

      {source && (
        <article>
          Source Node: {source.title}
          <button
            onClick={() => remove(source.id)}
            type="button"
            className="bg-blue-600 text-white p-2 rounded text-sm font-bold hover:bg-blue-700 transition-colors"
          >
            remove node
          </button>
        </article>
      )}
      {source && target && (
        <form>
          <div className="flex flex-col gap-1">
            <label htmlFor="edge-weight" className="text-xs text-gray-400">
              edge weight
            </label>
            <input
              id="edge-weight"
              type="text"
              value={edgeProps.weight}
              onChange={(e) => setEdgeProps({ ...edgeProps, weight: Number(e.target.value) })}
              placeholder="edge weight"
              className="border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              id="edge-weight"
              type="text"
              value={edgeProps.props.desc}
              onChange={(e) => setEdgeProps({ ...edgeProps, props: { desc: e.target.value } })}
              placeholder="advent"
              className="border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              onClick={(e) =>
                addEdge(e, String(edgeProps.weight), edgeProps.props.desc, source.id, target.id)
              }
              className={
                'p-3 rounded-lg text-sm font-black transition-all bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
              }
            >
              create karma
            </button>
          </div>
        </form>
      )}

      {target && (
        <article>
          target Node: {target.title}
          <button
            onClick={() => remove(target.id)}
            type="button"
            className="bg-blue-600 text-white p-2 rounded text-sm font-bold hover:bg-blue-700 transition-colors"
          >
            remove node
          </button>
        </article>
      )}
    </div>
  );
};

export default DevPanel;

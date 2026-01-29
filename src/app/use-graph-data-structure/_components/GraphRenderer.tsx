'use client';

import { useCallback, useMemo, useState } from 'react';
import DevPanel from './DevPanel';
import useWallpaper from '../_hooks/useWallpaper';
import RndNode from './RndNode';
import { Graph, type NodeType } from '../_managers/GraphManager';
import EdgeLine from './EdgeLine';

interface EdgeType {
  sourceId: string;
  targetId: string;
  desc?: string;
}

const GraphRenderer = () => {
  const { style } = useWallpaper();

  const graphManager = useMemo(() => new Graph(), []);

  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [sourceNode, setSourceNode] = useState<NodeType | null>(null);
  const [targetNode, setTargetNode] = useState<NodeType | null>(null);

  const addNode = useCallback(
    (title: string) => {
      const newNode = {
        id: `${Date.now()}`,
        title,
      };

      graphManager.addNode(newNode);

      setNodes([...graphManager.nodes]);
    },
    [graphManager],
  );
  const removeNode = useCallback(
    (id: string) => {
      graphManager.removeNode(id);
      setNodes([...graphManager.nodes]);
      if (sourceNode?.id === id) setSourceNode(null);
      if (targetNode?.id === id) setTargetNode(null);
    },
    [graphManager, sourceNode, targetNode],
  );

  const selectNode = useCallback(
    (id: string) => {
      const clickedNode = graphManager.getNodeById(id);
      if (!clickedNode) return;

      // scenario1: sourcenode 없으면 source 노드에 추가
      if (!sourceNode) {
        setSourceNode(clickedNode);
        //scenario2: sourceNode를 다시 클릭한다면 초기화
      } else if (sourceNode.id === id) {
        setSourceNode(null);
        setTargetNode(null);
        //scenario3: targetNode를 다시 클릭한다면 초기화
      } else if (targetNode?.id === id) {
        setTargetNode(null);
      } else {
        // scenario4: sourceNode가 있고 targetNode가 없으면 targetNode에 추가
        setTargetNode(clickedNode);
      }
    },
    [graphManager, sourceNode, targetNode],
  );

  const syncEdges = useCallback(() => {
    const edgeList: EdgeType[] = [];

    graphManager.edges.forEach((targets, source) => {
      const s = source as unknown as NodeType;
      targets.forEach((target) => {
        const t = target as unknown as NodeType;
        edgeList.push({
          sourceId: s.id,
          targetId: t.id,
          //desc: graphManager.getEdgeProperties(source, target)?.desc,
        });
      });
    });

    setEdges(edgeList);
  }, [graphManager]);

  const addEdge = useCallback(
    (e: SubmitEvent, weight: number, desc: string, sourceId: string, targetId: string) => {
      e.preventDefault();
      console.log(weight, desc);
      graphManager.addEdge(sourceId, targetId, { weight, desc });
      syncEdges();
    },
    [graphManager, syncEdges],
  );

  console.log('edges', edges);

  return (
    <div style={style} className="h-screen">
      <DevPanel
        add={addNode}
        target={targetNode}
        source={sourceNode}
        remove={removeNode}
        addEdge={addEdge}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {edges.map((edge) => (
          <EdgeLine key={edge.sourceId} sourceId={edge.sourceId} targetId={edge.targetId} />
        ))}
      </svg>

      {nodes.map(({ title, id }) => {
        return (
          <RndNode key={id}>
            <button type="button" onClick={() => selectNode(id)}>
              <div className="rounded-full p-4">{title}</div>
            </button>
          </RndNode>
        );
      })}
    </div>
  );
};

export default GraphRenderer;

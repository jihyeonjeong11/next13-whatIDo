'use client';

import { useCallback, useMemo, useState } from 'react';
import DevPanel from './DevPanel';
import useWallpaper from '../_hooks/useWallpaper';
import RndNode from './RndNode';
import { Graph, type NodeType } from '../_graph';

import EdgeLine from './EdgeLine';
import useNodes from '../_hooks/useNodes';
import EdgesPanel from './EdgesPanel';
import { getNodeById } from '../_graph/utils';

interface EdgeType {
  sourceId: string;
  targetId: string;
  desc?: string;
}

export type FlattenedEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  sTitle: string;
  tTitle: string;
  x: number;
  y: number;
  desc: string;
  weight: number;
};

// TODO: useGraph hook
const GraphRenderer = () => {
  const { style } = useWallpaper();

  const graphManager = useMemo(() => new Graph(), []);
  const { nodes, addNode, removeNode, selectNode, sourceNode, targetNode, onDragStop } =
    useNodes(graphManager);

  const [edges, setEdges] = useState<EdgeType[]>([]);

  // todo: useEdges
  const syncEdges = useCallback(() => {
    const edgeList: EdgeType[] = [];

    graphManager.edges.forEach((targets, source) => {
      const s = source as unknown as NodeType;
      targets.forEach((target) => {
        const t = target as unknown as NodeType;
        edgeList.push({
          sourceId: s.id,
          targetId: t.id,
        });
      });
    });

    setEdges(edgeList);
  }, [graphManager]);

  const addEdge = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      weight: number,
      desc: string,
      source: NodeType,
      target: NodeType,
    ) => {
      e.preventDefault();
      const createEdge = (weight: number, desc: string) =>
        ({
          weight,
          props: { desc },
        }) as const;
      graphManager.addEdge(source, target, createEdge(weight, desc));
      syncEdges();
    },
    [graphManager, syncEdges],
  );

  // todo: graphmanager 타입정리.
  const edgesWithProps = useMemo(() => {
    return edges.map((edge) => {
      const sNode = getNodeById(graphManager, edge.sourceId);
      const tNode = getNodeById(graphManager, edge.targetId);

      const props =
        sNode && tNode
          ? (graphManager.getEdgeProperties(sNode, tNode) as unknown as { desc: string })
          : undefined;
      const weight = sNode && tNode ? graphManager.getEdgeWeight(sNode, tNode) : undefined;

      return {
        id: `${edge.sourceId}-${edge.targetId}`,
        sourceId: edge.sourceId,
        targetId: edge.targetId,
        sTitle: sNode?.title ?? '',
        tTitle: tNode?.title ?? '',
        x: tNode?.x ?? 0,
        y: tNode?.y ?? 0,
        desc: props?.desc ?? 'error',
        weight: weight ?? -1,
      };
    });
  }, [edges, graphManager]);

  return (
    <div style={style} className="h-screen">
      <EdgesPanel edges={edgesWithProps} />

      <DevPanel
        add={addNode}
        target={targetNode}
        source={sourceNode}
        remove={removeNode}
        addEdge={addEdge}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <title>lines</title>
        {edges.map((edge) => (
          <EdgeLine
            key={`${edge.sourceId}-${edge.targetId}`}
            sourceState={nodes.find((n) => n.id === edge.sourceId) as NodeType}
            targetState={nodes.find((n) => n.id === edge.targetId) as NodeType}
          />
        ))}
      </svg>

      {nodes.map((n) => {
        return (
          <RndNode key={n.id} id={n.id} node={n} onDragStop={onDragStop}>
            <button type="button" onClick={() => selectNode(n.id)}>
              <div className="rounded-full p-4">{n.title}</div>
            </button>
          </RndNode>
        );
      })}
    </div>
  );
};

export default GraphRenderer;

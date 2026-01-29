import { useCallback, useState } from 'react';
import type { Graph, NodeType } from '../_managers/GraphManager';
import { RndDragCallback } from 'react-rnd';

// TODO: graphManager를 context로 바꿔야함.
const useNodes = (graphManager: Graph<NodeType, never>) => {
  const [nodes, setNodes] = useState<NodeType[]>([]);

  const [sourceNode, setSourceNode] = useState<NodeType | null>(null);
  const [targetNode, setTargetNode] = useState<NodeType | null>(null);

  const addNode = useCallback(
    (title: string) => {
      const newNode = {
        id: `${Date.now()}`,
        title,
        x: 0,
        y: 0,
      };

      graphManager.addNode(newNode);
      setNodes((prevNodes) => {
        const existings = new Map(prevNodes.map((n) => [n.id, n]));

        return Array.from(graphManager.nodes).map((n) => {
          const nodeData = n as NodeType;
          return existings.get(nodeData.id) || nodeData;
        });
      });
    },
    [graphManager],
  );
  const removeNode = useCallback(
    (id: string) => {
      graphManager.removeNode(id);
      setNodes((p) => p.filter((n) => n.id !== id));
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
  // todo: useNodePosition
  const onDragStop = useCallback(
    (id: string): RndDragCallback =>
      (_event, args) => {
        setNodes((prevNodes) =>
          prevNodes.map((n) => {
            if (n.id === id) {
              return {
                ...n,
                x: args.x,
                y: args.y,
              };
            } else {
              return n;
            }
          }),
        );
      },
    [],
  );

  return {
    nodes,
    addNode,
    removeNode,
    selectNode,
    sourceNode,
    targetNode,
    onDragStop,
  };
};

export default useNodes;

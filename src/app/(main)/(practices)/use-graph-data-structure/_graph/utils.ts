import type { Graph } from './GraphManager';
import type { NodeType } from './types';
/**
 * Returns node by given id.
 * // todo: The simplest brutal traverse. Make it batter later.
 */
export const getNodeById = (
  // biome-ignore lint/suspicious/noExplicitAny: <value can be any of type>
  graph: Graph<NodeType, any>,
  id: string | number,
): NodeType | undefined => {
  const allNodes = Array.from(graph.nodes);

  return allNodes.find((node) => {
    const nodeData = node as unknown as NodeType;
    return String(nodeData.id) === String(id);
  });
};

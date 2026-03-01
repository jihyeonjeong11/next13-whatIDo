export type NodeStatus = 'done' | 'in-progress' | 'todo';
export type NodeType = 'root' | 'category' | 'topic';

export interface RoadmapNode {
  id: string;
  label: string;
  x: number; // world center x
  y: number; // world center y
  width: number;
  height: number;
  type: NodeType;
  status: NodeStatus;
  href?: string; // e.g. /docs/html-canvas/IMGUI-vs-RMGUI
}

export interface RoadmapEdge {
  id: string;
  from: string; // node id
  to: string; // node id
}

export interface RoadmapData {
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

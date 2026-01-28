'use client';

import { useCallback, useMemo, useState } from 'react';
import DevPanel from './DevPanel';
import useWallpaper from '../_hooks/useWallpaper';
import RndNode from './RndNode';
import { Graph } from '../_managers/GraphManager';

const GraphRenderer = () => {
  const { style } = useWallpaper();

  const graphManager = useMemo(() => new Graph(), []);

  const [nodes, setNodes] = useState<unknown[]>([]);

  const addNode = useCallback(() => {
    const newNode = {
      id: Date.now(),
    };

    graphManager.addNode(`${Date.now()}}`);

    setNodes([...graphManager.nodes]);

    console.log('노드 추가됨:', newNode);
  }, [graphManager]);

  return (
    <div style={style} className="h-screen">
      <DevPanel add={addNode} />
      {nodes.map((n) => {
        return (
          <RndNode key={'node'}>
            <div className="rounded-full p-4">node1</div>
          </RndNode>
        );
      })}
    </div>
  );
};

export default GraphRenderer;

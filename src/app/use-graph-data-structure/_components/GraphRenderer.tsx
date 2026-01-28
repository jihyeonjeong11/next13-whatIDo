'use client';

import { useState } from 'react';
import DevPanel from './DevPanel';
import useWallpaper from '../_hooks/useWallpaper';

const GraphRenderer = () => {
  const { style, getRandomWallpaper } = useWallpaper();
  console.log(JSON.stringify(style));

  const [nodes, setNodes] = useState({});

  return (
    <div style={style} className="h-screen">
      <DevPanel />
      Graph Renderer Component
    </div>
  );
};

export default GraphRenderer;

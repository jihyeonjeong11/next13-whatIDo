'use client';

import { useEffect, useRef } from 'react';
import { MapClient } from './clients/map-client';

const FantasyMapCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clientRef = useRef<MapClient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    clientRef.current = new MapClient(canvasRef.current);
    clientRef.current.init();
    return () => clientRef.current?.destroy();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default FantasyMapCanvas;

'use client';
import React, { useEffect, useRef } from 'react';
import { GameClient } from './clients/client';

const UsePostApocalypseTilesetPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clientRef = useRef<GameClient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    clientRef.current = new GameClient(canvasRef.current);
    clientRef.current.start();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default UsePostApocalypseTilesetPage;

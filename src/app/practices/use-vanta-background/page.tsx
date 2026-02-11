'use client';

import { useRef } from 'react';
import { useWallpaper } from '@/app/(main)/(practices)/use-vanta-background/hooks/useWallpaper';

export default function UseVanta() {
  const vantaRef = useRef(null);

  useWallpaper(vantaRef);

  return (
    <div className="grow">
      <div className="canvas" ref={vantaRef} />
      useVanta
    </div>
  );
}

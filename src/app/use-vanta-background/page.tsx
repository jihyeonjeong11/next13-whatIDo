'use client';

import React, { useEffect, useRef, useState } from 'react';
import HALO from 'vanta/dist/vanta.halo.min';
import * as THREE from 'three';
import { useWallpaper } from '@/app/use-vanta-background/hooks/useWallpaper';

export default function UseVanta() {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useWallpaper(vantaRef);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 934,
          minWidth: 1125,
          scale: 1.0,
          scaleMobile: 1.0,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <main className="w-[100vw] h-[100vh] bg-tan">
      <div className="" ref={vantaRef}>
        useVanta
      </div>
    </main>
  );
}

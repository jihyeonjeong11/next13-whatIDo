'use client';

import React, { useEffect, useRef, useState } from 'react';
import HALO from 'vanta/dist/vanta.halo.min';
import * as THREE from 'three';
import { useWallpaper } from '@/app/use-vanta-background/hooks/useWallpaper';

export default function UseVanta() {
  const vantaRef = useRef(null);

  useWallpaper(vantaRef);

  return (
    <main className="w-[100vw] h-[100vh] bg-tan">
      <div className="canvas" ref={vantaRef} />
      useVanta
    </main>
  );
}

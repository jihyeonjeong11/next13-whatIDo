'use client';

import React, { useEffect, useRef, useState } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
export default function UseVanta() {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          color: 0x14b679,
          backgroundColor: 0x15173c,
          maxDistance: 34.0,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destory();
    };
  }, [vantaEffect]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div ref={vantaRef}>
        <p style={{ color: '#fff', paddingTop: '20px' }}>
          Animated website backgrounds in a few lines of code.
        </p>
      </div>
    </main>
  );
}

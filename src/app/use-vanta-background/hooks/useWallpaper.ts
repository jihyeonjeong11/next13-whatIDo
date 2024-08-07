'use client';

// @ts-ignore
import { MutableRefObject, useEffect, useState } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

export const useWallpaper = (
  vantaRef: MutableRefObject<HTMLElement | null>,
) => {
  const [vantaEffect, setVantaEffect] = useState<any>(0);

  useEffect(() => {
    if (!vantaEffect) {
      if (!vantaRef.current) return;
      const desktopRect = vantaRef.current.getBoundingClientRect();
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: window.innerHeight,
          minWidth: desktopRect.width,
          scale: 1.0,
          scaleMobile: 1.0,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, vantaRef]);

  useEffect(() => {
    const resizeListener = (): void => {
      if (!vantaRef.current) return;
      const desktopRect = vantaRef.current.getBoundingClientRect();
      const canvasElement = vantaRef.current.querySelector(':scope > canvas');
      if (canvasElement instanceof HTMLCanvasElement && vantaEffect) {
        setVantaEffect(
          NET({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: window.innerHeight,
            minWidth: desktopRect.width,
            scale: 1.0,
            scaleMobile: 1.0,
          }),
        );
      }
    };

    window.addEventListener('resize', resizeListener, { passive: true });

    return () => window.removeEventListener('resize', resizeListener);
  }, [vantaRef, vantaEffect]);

  return {};
};

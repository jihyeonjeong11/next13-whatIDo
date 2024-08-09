'use client';

// @ts-ignore
import { MutableRefObject, useEffect, useState } from 'react';
import HALO from 'vanta/dist/vanta.halo.min';
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
        HALO({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          vertexColors: true,
          minHeight: window.innerHeight,
          minWidth: desktopRect.width,
          scale: 1.0,
          scaleMobile: 1.0,
          camera: {
            far: 400,
            fov: 30,
            near: 0.1,
          },
          color: 'hsl(225, 40%, 20%)',
          colorCycleSpeed: 10,
          forceAnimate: true,
          hh: 50,
          hue: 225,
          lightness: 20,
          material: {
            options: {
              fog: false,
              wireframe: false,
            },
          },
          saturation: 40,
          shininess: 35,
          waveHeight: 20,
          waveSpeed: 0.25,
          ww: 50,
        }),
      );
    }
    // eslint-disable-next-line consistent-return
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
          HALO({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            vertexColors: true,
            minHeight: window.innerHeight,
            minWidth: desktopRect.width,
            scale: 1.0,
            scaleMobile: 1.0,
            camera: {
              far: 400,
              fov: 30,
              near: 0.1,
            },
            color: 'hsl(225, 40%, 20%)',
            colorCycleSpeed: 10,
            forceAnimate: true,
            hh: 50,
            hue: 225,
            lightness: 20,
            material: {
              options: {
                fog: false,
                wireframe: false,
              },
            },
            saturation: 40,
            shininess: 35,
            waveHeight: 20,
            waveSpeed: 0.25,
            ww: 50,
          }),
        );
      }
    };

    window.addEventListener('resize', resizeListener, { passive: true });

    return () => window.removeEventListener('resize', resizeListener);
  }, [vantaRef, vantaEffect]);

  return {};
};

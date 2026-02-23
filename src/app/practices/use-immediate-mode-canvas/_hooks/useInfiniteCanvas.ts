/**
 * useInfiniteCanvas - Custom hook for infinite canvas navigation
 *
 * This hook handles all the math and logic for:
 * - Camera state management (x, y, scale)
 * - Zoom at mouse cursor (not center zoom)
 * - Pan via spacebar + click-drag or middle-mouse drag
 * - Dynamic grid rendering that scales and fades
 * - 60fps rendering with requestAnimationFrame
 * - Viewport culling for performance
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import {
  type CameraState,
  type Point,
  screenToWorld,
  worldToScreen,
  getVisibleWorldBounds,
  isRectVisible,
  clamp,
} from '../_utils/coordinates';

// Constants
const MIN_SCALE = 0.05; // 5% minimum zoom
const MAX_SCALE = 20; // 2000% maximum zoom
const ZOOM_SENSITIVITY = 0.001;
const GRID_BASE_SIZE = 50; // Base grid cell size in world units

export type UseInfiniteCanvasOptions = {};

// export interface UseInfiniteCanvasReturn {
//   canvasRef: React.RefObject<HTMLCanvasElement | null>;
//   camera: CameraState;
//   setCamera: (camera: CameraState) => void;
//   resetCamera: () => void;
//   screenToWorld: (screenPoint: Point) => Point;
//   worldToScreen: (worldPoint: Point) => Point;
//   isPanning: boolean;
//   isSpacePressed: boolean;
// }

export function useInfiniteCanvas(options: UseInfiniteCanvasOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas with background color
    ctx.fillStyle = '#1a1a2e'; // --color-bg-primary
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath(); // Start a new path
    ctx.moveTo(30, 50); // Move the pen to (30, 50)
    ctx.lineTo(150, 100); // Draw a line to (150, 100)
    ctx.stroke(); // Render the path

    // Draw grid

    // Draw nodes

    // Draw debug info

    // Schedule next frame
    animationFrameRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

  return [canvasRef];
}

export default useInfiniteCanvas;

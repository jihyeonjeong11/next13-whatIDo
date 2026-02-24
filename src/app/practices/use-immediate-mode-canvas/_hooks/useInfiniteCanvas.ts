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

import useShapes from './useShapes';
import useCamera from './useCamera';

// Constants
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

export function useInfiniteCanvas() {
  const [isPanning, setIsPanning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const { drawBlocks, drawRectangle } = useShapes();

  const { cameraState, moveCamera } = useCamera();

  const offset = { x: 0, y: 0, scale: 1 };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 왼쪽 버튼 클릭 시 패닝 시작
    if (e.button === 0) {
      setIsPanning(true);
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPanning || !lastMousePosRef.current) return;

      // 이전 마우스 위치와 현재 위치의 차이(delta) 계산
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;

      // 카메라 이동 실행
      moveCamera(dx, dy);

      // 현재 위치를 다시 저장
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    },
    [isPanning, moveCamera],
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    lastMousePosRef.current = null;
  }, []);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#2d2d44';

    const startX = Math.floor(-offset.x / offset.scale / GRID_BASE_SIZE) * GRID_BASE_SIZE;
    const endX = startX + width / offset.scale + GRID_BASE_SIZE;

    const startY = Math.floor(-offset.y / offset.scale / GRID_BASE_SIZE) * GRID_BASE_SIZE;
    const endY = startY + height / offset.scale + GRID_BASE_SIZE;

    for (let x = startX; x <= endX; x += GRID_BASE_SIZE) {
      ctx.moveTo(x + offset.x, 0);
      ctx.lineTo(x + offset.x, height);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let y = startY; y <= endY; y += GRID_BASE_SIZE) {
      ctx.moveTo(0, y + offset.y);
      ctx.lineTo(width, y + offset.y);
    }
    ctx.stroke();

    ctx.restore();
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with background color
    ctx.translate(0, 0);

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 카메라 위치로 이동
    ctx.translate(cameraState.x, cameraState.y);

    //drawBlocks(ctx);
    drawRectangle(ctx, 500, 500, 90, 100);

    // Draw debug info

    // Schedule next frame
    animationFrameRef.current = requestAnimationFrame(render);
  }, [drawRectangle, cameraState.x, cameraState.y]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

  useEffect(() => {
    if (isPanning) {
      window.addEventListener('mousemove', handleMouseMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp, { passive: true });
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, isPanning]);

  return { canvasRef, onMouseDown: handleMouseDown };
}

export default useInfiniteCanvas;

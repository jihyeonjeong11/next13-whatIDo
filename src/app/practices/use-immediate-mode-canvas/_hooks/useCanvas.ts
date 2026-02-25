import { useCallback, useEffect, useRef, useState } from 'react';
import useShapes from './useShapes';
import useCamera from './useCamera';

interface CanvasState {
  pixelRatio: number;
  container: {
    width: number;
    height: number;
  };
  camera: {
    x: number;
    y: number;
    z: number;
  };
}

const radians = (angle: number) => angle * (Math.PI / 180);
export const CAMERA_ANGLE = radians(30);
export const RECT_W = 500;
export const RECT_H = 500;

export const getInitialCanvasState = (): CanvasState => ({
  pixelRatio: window.devicePixelRatio || 1,
  container: { width: 0, height: 0 },
  camera: { x: 0, y: 0, z: 1 },
});

export const cameraToScreenCoordinates = (
  x: number,
  y: number,
  z: number,
  cameraAngle: number,
  screenAspect: number,
) => {
  const width = 2 * z * Math.tan(CAMERA_ANGLE);
  const height = width / screenAspect;
  const screenX = x - width / 2;
  const screenY = y - height / 2;
  return { x: screenX, y: screenY, width, height };
};

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  /**
   * closure를 방지하기 위한 canvas state ref
   * todo: 따로 Store를 만들 것
   */
  const canvasStateRef = useRef<CanvasState>(getInitialCanvasState());
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

  const [isPanning, setIsPanning] = useState(false);

  const { drawBlocks } = useShapes();

  /**
   * side effect 방지를 위해서 여기서 setState할 것
   */
  const updateCanvasState = useCallback((updater: (p: CanvasState) => CanvasState) => {
    canvasStateRef.current = updater(canvasStateRef.current);
  }, []);

  /**
   *실제 canvas를 그리는 render loop
   */
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { camera } = canvasStateRef.current;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.setTransform(camera.z, 0, 0, camera.z, camera.x, camera.y);
    drawBlocks(ctx);

    animationFrameRef.current = requestAnimationFrame(render);
  }, [drawBlocks]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPanning || !lastMousePosRef.current) return;

      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;

      updateCanvasState((p) => ({
        ...p,
        camera: {
          ...p.camera,
          x: p.camera.x + dx,
          y: p.camera.y + dy,
        },
      }));

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    },
    [isPanning, updateCanvasState],
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    lastMousePosRef.current = null;
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      updateCanvasState((p) => ({
        ...p,
        camera: {
          ...p.camera,
          z: Math.max(0.1, p.camera.z - e.deltaY * 0.001),
        },
      }));
    },
    [updateCanvasState],
  );

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { container, pixelRatio } = canvasStateRef.current;

    canvas.width = container.width * pixelRatio;
    canvas.height = container.height * pixelRatio;
    canvas.style.width = `${container.width}px`;
    canvas.style.height = `${container.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(pixelRatio, pixelRatio);
  }, []);

  // init
  useEffect(() => {
    updateCanvasState((p) => ({
      ...p,
      container: {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      },
      // camera는 건드리지 않음 - 초기값 유지
    }));

    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render, updateCanvasState]);

  // resizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasState((p) => ({
        ...p,
        container: {
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        },
      }));
      handleResize();
    });

    const parent = canvas.parentElement;
    if (parent) resizeObserver.observe(parent);
    handleResize();

    return () => resizeObserver.disconnect();
  }, [handleResize, updateCanvasState]);

  // pan listeners
  useEffect(() => {
    if (isPanning) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning, handleMouseMove, handleMouseUp]);

  // zoom listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return { canvasRef, onMousedown: handleMouseDown };
};

export default useCanvas;

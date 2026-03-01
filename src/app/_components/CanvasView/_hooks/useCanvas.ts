import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clamp,
  screenToWorld,
  type Point,
} from '@/app/practices/use-immediate-mode-canvas/_utils/coordinates';

export interface CameraState {
  x: number;
  y: number;
  z: number;
}

const INITIAL_CAMERA: CameraState = { x: 0, y: 0, z: 1 };
const MIN_SCALE = 0.05;
const MAX_SCALE = 20;
const ZOOM_SENSITIVITY = 0.001;
const GRID_BASE_SIZE = 50;

// Adaptive grid: coarsen when zoomed out, maintain density
const getGridStep = (zoom: number) => {
  const raw = GRID_BASE_SIZE / zoom;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const normalized = raw / magnitude;
  const step = normalized < 2 ? 1 : normalized < 5 ? 2 : 5;
  return step * magnitude;
};

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [camera, setCameraState] = useState<CameraState>(INITIAL_CAMERA);

  const cameraRef = useRef(camera);
  cameraRef.current = camera;

  const isPanningRef = useRef(false);
  const isSpacePressedRef = useRef(false);
  const lastMousePosRef = useRef<Point>({ x: 0, y: 0 });
  const mouseWorldPosRef = useRef<Point>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const setCamera = useCallback((next: CameraState) => {
    setCameraState(next);
  }, []);

  // ── Wheel (zoom at cursor) ──────────────────────────────────────────────
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      const worldBefore = screenToWorld({ x: mouseX, y: mouseY }, cameraRef.current, w, h);
      const delta = -e.deltaY * ZOOM_SENSITIVITY;
      const newZ = clamp(cameraRef.current.z * (1 + delta), MIN_SCALE, MAX_SCALE);
      const worldAfter = screenToWorld(
        { x: mouseX, y: mouseY },
        { ...cameraRef.current, z: newZ },
        w,
        h,
      );

      setCamera({
        x: cameraRef.current.x + (worldBefore.x - worldAfter.x),
        y: cameraRef.current.y + (worldBefore.y - worldAfter.y),
        z: newZ,
      });
    },
    [setCamera],
  );

  // ── Resize ─────────────────────────────────────────────────────────────
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // ── Pan ────────────────────────────────────────────────────────────────
  const handleMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (isSpacePressedRef.current || e.button === 1) {
      e.preventDefault();
      isPanningRef.current = true;
      const rect = canvas.getBoundingClientRect();
      lastMousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      canvas.style.cursor = 'grabbing';
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      mouseWorldPosRef.current = screenToWorld(
        current,
        cameraRef.current,
        canvas.clientWidth,
        canvas.clientHeight,
      );

      if (isSpacePressedRef.current && !isPanningRef.current) {
        canvas.style.cursor = 'grab';
      }

      if (isPanningRef.current) {
        const dx = current.x - lastMousePosRef.current.x;
        const dy = current.y - lastMousePosRef.current.y;
        const cam = cameraRef.current;
        setCamera({ ...cam, x: cam.x - dx / cam.z, y: cam.y - dy / cam.z });
        lastMousePosRef.current = current;
      }
    },
    [setCamera],
  );

  const handleMouseUp = useCallback(() => {
    const canvas = canvasRef.current;
    isPanningRef.current = false;
    if (canvas) canvas.style.cursor = isSpacePressedRef.current ? 'grab' : 'default';
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' && !e.repeat) {
      e.preventDefault();
      isSpacePressedRef.current = true;
      const canvas = canvasRef.current;
      if (canvas && !isPanningRef.current) canvas.style.cursor = 'grab';
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      isSpacePressedRef.current = false;
      const canvas = canvasRef.current;
      if (canvas && !isPanningRef.current) canvas.style.cursor = 'default';
    }
  }, []);

  // ── Draw: grid ─────────────────────────────────────────────────────────
  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, cam: CameraState, w: number, h: number) => {
      const step = getGridStep(cam.z) * GRID_BASE_SIZE;

      const minX = cam.x - w / 2 / cam.z;
      const maxX = cam.x + w / 2 / cam.z;
      const minY = cam.y - h / 2 / cam.z;
      const maxY = cam.y + h / 2 / cam.z;

      const startX = Math.floor(minX / step) * step;
      const startY = Math.floor(minY / step) * step;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;

      for (let x = startX; x <= maxX; x += step) {
        const sx = (x - cam.x) * cam.z + w / 2;
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx, h);
      }
      for (let y = startY; y <= maxY; y += step) {
        const sy = (y - cam.y) * cam.z + h / 2;
        ctx.moveTo(0, sy);
        ctx.lineTo(w, sy);
      }
      ctx.stroke();

      // Origin crosshair
      const ox = (0 - cam.x) * cam.z + w / 2;
      const oy = (0 - cam.y) * cam.z + h / 2;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1;
      ctx.moveTo(ox, 0);
      ctx.lineTo(ox, h);
      ctx.moveTo(0, oy);
      ctx.lineTo(w, oy);
      ctx.stroke();

      // Origin dot
      ctx.beginPath();
      ctx.arc(ox, oy, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fill();
    },
    [],
  );

  // ── Draw: debug HUD ────────────────────────────────────────────────────
  const drawDebugInfo = useCallback((ctx: CanvasRenderingContext2D, cam: CameraState) => {
    ctx.font = '11px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    const mouse = mouseWorldPosRef.current;
    [
      `cam (${cam.x.toFixed(0)}, ${cam.y.toFixed(0)})`,
      `zoom ${(cam.z * 100).toFixed(0)}%`,
      `cursor (${mouse.x.toFixed(0)}, ${mouse.y.toFixed(0)})`,
    ].forEach((t, i) => {
      ctx.fillText(t, 12, 18 + i * 16);
    });
  }, []);

  // ── Render loop ────────────────────────────────────────────────────────
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { clientWidth: w, clientHeight: h } = canvas;
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, w, h);

    drawGrid(ctx, camera, w, h);
    drawDebugInfo(ctx, camera);

    animationFrameRef.current = requestAnimationFrame(render);
  }, [camera, drawGrid, drawDebugInfo]);

  // ── Event listener registration ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const ro = new ResizeObserver(handleResize);
    const container = canvas.parentElement;
    if (container) ro.observe(container);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      ro.disconnect();
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleKeyDown,
    handleKeyUp,
    handleResize,
  ]);

  // ── Render loop start/stop ─────────────────────────────────────────────
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [render]);

  return { canvasRef, camera };
};

export default useCanvas;

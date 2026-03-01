import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  clamp,
  screenToWorld,
  type Point,
} from '@/app/practices/use-immediate-mode-canvas/_utils/coordinates';
import type { RoadmapData, RoadmapEdge, RoadmapNode } from '../types';
import rawData from '../Nodes.json';

const roadmapData = rawData as RoadmapData;

// node lookup: id → node (built once at module level)
const nodeMap = new Map<string, RoadmapNode>(
  roadmapData.nodes.map((n) => [n.id, n]),
);

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

// ── Node colors ────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  done: { fill: 'rgba(21, 128, 61, 0.25)', stroke: '#16a34a', text: '#86efac' },
  'in-progress': { fill: 'rgba(161, 98, 7, 0.25)', stroke: '#ca8a04', text: '#fde68a' },
  todo: { fill: 'rgba(55, 65, 81, 0.25)', stroke: '#4b5563', text: '#9ca3af' },
} as const;

const ROOT_COLORS = { fill: 'rgba(29, 78, 216, 0.3)', stroke: '#3b82f6', text: '#ffffff' };
const CAT_COLORS = { fill: 'rgba(30, 41, 59, 0.6)', stroke: '#64748b', text: '#e2e8f0' };

// ── Hit detection ──────────────────────────────────────────────────────────
function hitTest(node: RoadmapNode, worldX: number, worldY: number): boolean {
  return (
    worldX >= node.x - node.width / 2 &&
    worldX <= node.x + node.width / 2 &&
    worldY >= node.y - node.height / 2 &&
    worldY <= node.y + node.height / 2
  );
}

function findHoveredNode(worldX: number, worldY: number): RoadmapNode | null {
  // Reverse so top-drawn nodes get hit priority
  for (let i = roadmapData.nodes.length - 1; i >= 0; i--) {
    if (hitTest(roadmapData.nodes[i], worldX, worldY)) return roadmapData.nodes[i];
  }
  return null;
}

// ── Pure draw functions (no hook deps) ────────────────────────────────────
function drawEdge(
  ctx: CanvasRenderingContext2D,
  edge: RoadmapEdge,
  cam: CameraState,
  w: number,
  h: number,
) {
  const from = nodeMap.get(edge.from);
  const to = nodeMap.get(edge.to);
  if (!from || !to) return;

  // world: bottom-center of source → top-center of target
  const fx = from.x;
  const fy = from.y + from.height / 2;
  const tx = to.x;
  const ty = to.y - to.height / 2;

  // world → screen
  const sfx = (fx - cam.x) * cam.z + w / 2;
  const sfy = (fy - cam.y) * cam.z + h / 2;
  const stx = (tx - cam.x) * cam.z + w / 2;
  const sty = (ty - cam.y) * cam.z + h / 2;

  const midY = (sfy + sty) / 2;

  ctx.beginPath();
  ctx.moveTo(sfx, sfy);
  ctx.bezierCurveTo(sfx, midY, stx, midY, stx, sty);
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  node: RoadmapNode,
  cam: CameraState,
  w: number,
  h: number,
  isHovered: boolean,
) {
  const sx = (node.x - cam.x) * cam.z + w / 2;
  const sy = (node.y - cam.y) * cam.z + h / 2;
  const sw = node.width * cam.z;
  const sh = node.height * cam.z;
  const radius = 8 * cam.z;
  const left = sx - sw / 2;
  const top = sy - sh / 2;

  const colors =
    node.type === 'root'
      ? ROOT_COLORS
      : node.type === 'category'
        ? CAT_COLORS
        : STATUS_COLORS[node.status];

  // Hover outer glow
  if (isHovered) {
    ctx.beginPath();
    ctx.roundRect(left - 3, top - 3, sw + 6, sh + 6, radius + 3);
    ctx.strokeStyle = `${colors.stroke}55`;
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  // Fill
  ctx.beginPath();
  ctx.roundRect(left, top, sw, sh, radius);
  ctx.fillStyle = isHovered ? colors.stroke + '33' : colors.fill;
  ctx.fill();

  // Stroke
  ctx.beginPath();
  ctx.roundRect(left, top, sw, sh, radius);
  ctx.strokeStyle = colors.stroke;
  ctx.lineWidth = isHovered ? 2.5 : node.type === 'root' ? 2 : 1.5;
  ctx.stroke();

  // Label
  const fontSize =
    node.type === 'root' ? 14 * cam.z : node.type === 'category' ? 13 * cam.z : 12 * cam.z;
  const weight = node.type === 'root' ? '600 ' : node.type === 'category' ? '500 ' : '';
  ctx.font = `${weight}${fontSize}px sans-serif`;
  ctx.fillStyle = colors.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(node.label, sx, sy);
}

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [camera, setCameraState] = useState<CameraState>(INITIAL_CAMERA);
  const router = useRouter();

  const cameraRef = useRef(camera);
  cameraRef.current = camera;

  const isPanningRef = useRef(false);
  const isSpacePressedRef = useRef(false);
  const lastMousePosRef = useRef<Point>({ x: 0, y: 0 });
  const mouseWorldPosRef = useRef<Point>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const hoveredNodeIdRef = useRef<string | null>(null);

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

  // ── Pan + Click ────────────────────────────────────────────────────────
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (isSpacePressedRef.current || e.button === 1) {
        e.preventDefault();
        isPanningRef.current = true;
        const rect = canvas.getBoundingClientRect();
        lastMousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        canvas.style.cursor = 'grabbing';
        return;
      }

      // Left click on a node with href → navigate
      if (e.button === 0) {
        const world = mouseWorldPosRef.current;
        const node = findHoveredNode(world.x, world.y);
        if (node?.href) router.push(node.href);
      }
    },
    [router],
  );

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

      // Update hover
      const hovered = findHoveredNode(mouseWorldPosRef.current.x, mouseWorldPosRef.current.y);
      hoveredNodeIdRef.current = hovered?.id ?? null;

      // Update cursor
      if (!isPanningRef.current) {
        if (isSpacePressedRef.current) {
          canvas.style.cursor = 'grab';
        } else {
          canvas.style.cursor = hovered?.href ? 'pointer' : 'default';
        }
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
    if (!canvas) return;
    const hovered = findHoveredNode(mouseWorldPosRef.current.x, mouseWorldPosRef.current.y);
    canvas.style.cursor = isSpacePressedRef.current
      ? 'grab'
      : hovered?.href
        ? 'pointer'
        : 'default';
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
      if (!canvas) return;
      const hovered = findHoveredNode(mouseWorldPosRef.current.x, mouseWorldPosRef.current.y);
      canvas.style.cursor = hovered?.href ? 'pointer' : 'default';
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

  // ── Draw: edges ────────────────────────────────────────────────────────
  const drawEdges = useCallback(
    (ctx: CanvasRenderingContext2D, cam: CameraState, w: number, h: number) => {
      for (const edge of roadmapData.edges) {
        drawEdge(ctx, edge, cam, w, h);
      }
    },
    [],
  );

  // ── Draw: nodes ────────────────────────────────────────────────────────
  const drawNodes = useCallback(
    (ctx: CanvasRenderingContext2D, cam: CameraState, w: number, h: number) => {
      const hoveredId = hoveredNodeIdRef.current;
      for (const node of roadmapData.nodes) {
        drawNode(ctx, node, cam, w, h, node.id === hoveredId);
      }
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
    drawEdges(ctx, camera, w, h);
    drawNodes(ctx, camera, w, h);
    drawDebugInfo(ctx, camera);

    animationFrameRef.current = requestAnimationFrame(render);
  }, [camera, drawGrid, drawEdges, drawNodes, drawDebugInfo]);

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

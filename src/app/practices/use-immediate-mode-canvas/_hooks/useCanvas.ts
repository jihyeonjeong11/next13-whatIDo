import { useCallback, useEffect, useRef } from 'react';
import useShapes from './useShapes';

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
  camera: { x: 0, y: 0, z: 0 },
});

export const cameraToScreenCoordinates = (
  x: number,
  y: number,
  z: number,
  cameraAngle: number,
  screenAspect: number,
) => {
  const width = 2 * z * Math.tan(cameraAngle);
  const height = width / screenAspect;
  const screenX = x - width / 2;
  const screenY = y - height / 2;
  return { x: screenX, y: screenY, width, height };
};

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /**
   * side 업데이트를 막기 위한 ref
   * - useState 대신 useRef를 사용하여 render 함수가 클로저 캡처 없이 최신값을 참조
   * - canvasState가 바뀌어도 render useEffect가 재실행되지 않음
   */
  const canvasStateRef = useRef<CanvasState>(getInitialCanvasState());

  const animationFrameRef = useRef<number | null>(null);
  const isPanningRef = useRef(false);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

  /** 마우스 커서의 canvas 내 위치 (offsetX/Y) */
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const { drawBlocks } = useShapes();

  const updateCanvasState = useCallback((updater: (p: CanvasState) => CanvasState) => {
    canvasStateRef.current = updater(canvasStateRef.current);
  }, []);

  // ── 렌더 ──────────────────────────────────────────────
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { camera, container } = canvasStateRef.current;

    // ✅ transform 초기화 후 배경 클리어
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 그 다음 카메라 transform 적용
    const screenAspect = container.width / container.height;
    const screen = cameraToScreenCoordinates(
      camera.x,
      camera.y,
      camera.z,
      CAMERA_ANGLE,
      screenAspect,
    );

    console.log(container);

    const scaleX = container.width / screen.width;
    const scaleY = container.height / screen.height;

    ctx.setTransform(scaleX, 0, 0, scaleY, -screen.x * scaleX, -screen.y * scaleY);

    drawBlocks(ctx);

    animationFrameRef.current = requestAnimationFrame(render);
  }, [drawBlocks]);
  // ── 마우스 패닝 ───────────────────────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      isPanningRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPanningRef.current || !lastMousePosRef.current) return;

      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;

      updateCanvasState((p) => {
        const { camera, container } = p;
        const screenAspect = container.width / container.height;
        const screen = cameraToScreenCoordinates(
          camera.x,
          camera.y,
          camera.z,
          CAMERA_ANGLE,
          screenAspect,
        );
        // 스크린 → 월드 비율로 delta 변환
        const scaleX = container.width / screen.width;
        const scaleY = container.height / screen.height;

        return {
          ...p,
          camera: {
            ...camera,
            x: camera.x - dx / scaleX,
            y: camera.y - dy / scaleY,
          },
        };
      });

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    },
    [updateCanvasState],
  );

  const handleMouseUp = useCallback(() => {
    isPanningRef.current = false;
    lastMousePosRef.current = null;
  }, []);

  // ── 휠 줌 (targeted zoom) ─────────────────────────────
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const { x: mouseX, y: mouseY } = pointerRef.current;

      updateCanvasState((p) => {
        const { camera, container } = p;
        const screenAspect = container.width / container.height;

        // 줌 전 scale
        const screenBefore = cameraToScreenCoordinates(
          camera.x,
          camera.y,
          camera.z,
          CAMERA_ANGLE,
          screenAspect,
        );
        const scaleBefore = container.width / screenBefore.width;

        // 마우스의 월드 좌표 (줌 전)
        const mouseWorldX = camera.x + (mouseX - container.width / 2) / scaleBefore;
        const mouseWorldY = camera.y + (mouseY - container.height / 2) / scaleBefore;

        // 새 z (카메라 높이 - 클수록 줌아웃)
        const newZ = Math.max(1, camera.z + e.deltaY * 0.5);

        // 줌 후 scale
        const screenAfter = cameraToScreenCoordinates(
          camera.x,
          camera.y,
          newZ,
          CAMERA_ANGLE,
          screenAspect,
        );
        const scaleAfter = container.width / screenAfter.width;

        // 마우스 위치가 줌 전후로 동일한 월드 좌표를 가리키도록 x, y 보정
        return {
          ...p,
          camera: {
            x: mouseWorldX - (mouseX - container.width / 2) / scaleAfter,
            y: mouseWorldY - (mouseY - container.height / 2) / scaleAfter,
            z: newZ,
          },
        };
      });
    },
    [updateCanvasState],
  );

  // ── 리사이즈 ──────────────────────────────────────────
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    // Set canvas size to match container
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Scale context for retina displays
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // 초기화 & RAF 시작
  useEffect(() => {
    const containerWidth = document.body.clientWidth;
    const containerHeight = document.body.clientHeight;

    updateCanvasState(() => ({
      pixelRatio: window.devicePixelRatio || 1,
      container: {
        width: containerWidth,
        height: containerHeight,
      },
      camera: {
        x: 1.5 * RECT_W, // 3x3 블록의 중앙
        y: RECT_H,
        z: containerWidth / (2 * Math.tan(CAMERA_ANGLE)), // 화면에 딱 맞는 높이
      },
    }));

    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render, updateCanvasState]);

  // ResizeObserver
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

  // 마우스 panning 이벤트
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // 휠, 포인터 이벤트
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.offsetX, y: e.offsetY };
    };

    canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  return { canvasRef, onMousedown: handleMouseDown };
};

export default useCanvas;

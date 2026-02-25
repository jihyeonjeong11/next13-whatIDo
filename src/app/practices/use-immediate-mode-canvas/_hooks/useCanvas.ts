import { useCallback, useEffect, useRef, useState } from 'react';
import useShapes from './useShapes';
import useCamera from './useCamera';

interface CanvasState {
  pixelRatio: number; // our resolution for dip calculations
  container: {
    //holds information related to our screen container
    width: number;
    height: number;
  };
  camera: {
    //holds camera state
    x: number;
    y: number;
    z: number;
  };
}

const radians = (angle: number) => {
  return angle * (Math.PI / 180);
};
export const CAMERA_ANGLE = radians(30);
export const RECT_W = 500;
export const RECT_H = 500;

export const getInitialCanvasState = (): CanvasState => {
  return {
    pixelRatio: window.devicePixelRatio || 1,
    container: {
      width: 0,
      height: 0,
    },
    camera: {
      x: 0,
      y: 0,
      z: 0,
    },
  };
};

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
  const [canvasState, setCanvasState] = useState<CanvasState>(getInitialCanvasState());
  const animationFrameRef = useRef<number | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { cameraState, moveCamera } = useCamera();

  const { drawBlocks } = useShapes();

  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

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
      //moveCamera(dx, dy);
      setCanvasState((p) => ({
        ...p,
        camera: {
          x: p.camera.x + dx,
          y: p.camera.y + dy,
          z: p.camera.z,
        },
      }));

      // 현재 위치를 다시 저장
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    },
    [isPanning],
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    lastMousePosRef.current = null;
  }, []);

  const handleWheels = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setCanvasState((p) => ({
      ...p,
      camera: {
        ...p.camera,
        z: p.camera.z + e.deltaY * 0.01,
      },
    }));
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // TODO: scale 줌인 줌아웃
    const dpr = window.devicePixelRatio || 1;

    // canvas.width = rect.width * dpr;
    // canvas.height = rect.height * dpr;
    // canvas.style.width = `${rect.width}px`;
    // canvas.style.height = `${rect.height}px`;

    canvas.width = canvasState.container.width * canvasState.pixelRatio;
    canvas.height = canvasState.container.height * canvasState.pixelRatio;
    canvas.style.width = `${canvasState.container.width}px`;
    canvas.style.height = `${canvasState.container.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(canvasState.pixelRatio, canvasState.pixelRatio);
    }
  }, [canvasState.container.height, canvasState.container.width, canvasState.pixelRatio]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Buffer 시작
    // Canvas 전체 초기화
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log(canvasState);

    //ctx.scale(dpr, dpr); // https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/scale

    // 카메라 위치
    //ctx.translate(cameraState.x, cameraState.y); // https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/translate
    ctx.setTransform(
      canvasState.camera.z,
      0,
      0,
      canvasState.camera.z,
      canvasState.camera.x,
      canvasState.camera.y,
    );
    // draw anything
    drawBlocks(ctx);
    // ctx.restore(); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore

    animationFrameRef.current = requestAnimationFrame(render);
  }, [drawBlocks, canvasState.camera.x, canvasState.camera.y, canvasState.camera.z, canvasState]);

  useEffect(() => {
    // RAF 호출 주기는 모니터 주사율과 같음 60fps.
    // CanvasState 추가
    setCanvasState((p) => ({
      ...p,
      container: { width: document.body.clientWidth, height: document.body.clientHeight },
    }));
    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

  useEffect(() => {
    // 모니터 가로세로비와 canvas의 크기를 맞춤
    const canvas = canvasRef.current;
    if (canvas) {
      const resizeObserver = new ResizeObserver(handleResize);
      const parent = canvas.parentElement;
      if (parent) {
        resizeObserver.observe(parent);
      }
      handleResize();
    }
  }, [handleResize]);

  useEffect(() => {
    if (isPanning) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('wheel', handleWheels, { passive: false });
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheels);
    };
  }, [handleMouseMove, handleMouseUp, isPanning, handleWheels]);
  return { canvasRef: canvasRef, onMousedown: handleMouseDown, handleWheels };
};

export default useCanvas;

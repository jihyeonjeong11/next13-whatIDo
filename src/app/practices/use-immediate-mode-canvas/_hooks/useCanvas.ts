import { useCallback, useEffect, useRef, useState } from 'react';
import useShapes from './useShapes';
import useCamera from './useCamera';

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isPanning, setIsPanning] = useState(false);

  const { cameraState, moveCamera } = useCamera();
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

  const { drawBlocks } = useShapes();

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // TODO: scale 줌인 줌아웃
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Buffer 시작
    // Canvas 전체 초기화
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const dpr = window.devicePixelRatio || 1;

    //ctx.scale(dpr, dpr); // https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/scale

    // 카메라 위치
    //ctx.translate(cameraState.x, cameraState.y); // https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/translate
    ctx.setTransform(1, 0, 0, 1, cameraState.x, cameraState.y);
    // draw anything
    drawBlocks(ctx);
    // ctx.restore(); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore

    animationFrameRef.current = requestAnimationFrame(render);
  }, [drawBlocks, cameraState.x, cameraState.y]);

  useEffect(() => {
    // RAF 호출 주기는 모니터 주사율과 같음 60fps.
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
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, isPanning]);
  return { canvasRef: canvasRef, onMousedown: handleMouseDown };
};

export default useCanvas;

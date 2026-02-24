import { useCallback, useEffect, useRef } from 'react';
import useShapes from './useShapes';

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const { drawRectangle, drawBlocks } = useShapes();

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
    // draw anything
    drawRectangle(ctx, 0, 0, 100, 100);
    drawBlocks(ctx);
    animationFrameRef.current = requestAnimationFrame(render);
  }, [drawRectangle, drawBlocks]);

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
      new ResizeObserver(handleResize);
      handleResize();
      render();
    }
  }, [render, handleResize]);
  return { canvasRef };
};

export default useCanvas;

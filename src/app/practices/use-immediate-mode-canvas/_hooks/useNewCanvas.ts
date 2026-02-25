import { useCallback, useEffect, useRef, useState } from 'react';
import { worldToScreen, type Point } from '../_utils/coordinates';

//canvasref
// render 펑션
// resize 펑션
// 카메라
// 팬 이벤트 리스너
// 줌
// 그리드
// 디버그인포

const initialCamera = {
  x: 0,
  y: 0,
  z: 1,
};

export interface CameraState {
  x: number; // World X position (center of viewport)
  y: number; // World Y position (center of viewport)
  z: number; // Zoom level
}

const useCanvas = () => {
  // Canvas reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [camera, setCameraState] = useState<CameraState>({
    x: initialCamera.x ?? 0,
    y: initialCamera.y ?? 0,
    z: initialCamera.z ?? 1,
  });

  // 실제 컴포넌트에서 사용하기 위한 callback
  const [_isPanning, setIsPanning] = useState(false);
  const [_isSpacePressed, setIsSpacePressed] = useState(false);

  // camera ref. useEffect와 useCallback에 포함시키지 않기 위해 펑션에서는 ref 의 밸류를 가져다 사용한다.
  const cameraRef = useRef(camera);
  cameraRef.current = camera;

  // 실제 컴포넌트에서 사용하기 위한 callback
  const setCamera = useCallback((newCamera: CameraState) => {
    setCameraState(newCamera);
    // onCameraChange?.(newCamera);
  }, []);

  // state refs: rerender를 억제하기 위해 스테이트는 저장, 실제 펑션에서는 ref 안의 내용을 가져다 쓴다.
  const isPanningRef = useRef(false);
  const isSpacePressedRef = useRef(false);
  const lastMousePosRef = useRef<Point>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  /**
   * 캔버스 실제 화면 리사이저
   */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect(); // 브라우저 전역 좌표(css 픽셀)
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // 레티나 디스플레이(고해상도)용 스케일링
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  /**
   * 패닝 중단 리스너
   */
  const handleMouseUp = useCallback(() => {
    const canvas = canvasRef.current;

    isPanningRef.current = false;
    setIsPanning(false);

    if (canvas) {
      canvas.style.cursor = isSpacePressedRef.current ? 'grab' : 'default';
    }
  }, []);

  /**
   * Pan으로 인한 캔버스 카메라 이동.
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const currentPos = {
        x: e.clientX - rect.left, // 뷰포트 기준 마우스 x - 뷰포트 기준 canvas 시작점 = canvas 기준 마우스 x
        y: e.clientY - rect.top,
      };

      // Space가 눌린 상태에서만 Hand mode
      if (isSpacePressedRef.current && !isPanningRef.current) {
        canvas.style.cursor = 'grab';
      }

      if (isPanningRef.current) {
        const deltaX = currentPos.x - lastMousePosRef.current.x; // 현재 좌표 - 이전 마우스 위치(이벤트로 기록하는) = 유저가 pan 한 거리
        const deltaY = currentPos.y - lastMousePosRef.current.y;

        const cam = cameraRef.current;
        setCamera({
          ...cam,
          x: cam.x - deltaX / cam.z, // 현재 위치 - 픽셀 거리(실제 카메라의 이동과는 반대로 이동한것이므로 - 연산) / 줌 레벨
          y: cam.y - deltaY / cam.z,
        });

        lastMousePosRef.current = currentPos;
      }
    },
    // 브라우저 전역 좌표(clientX) -> 캔버스 로컬 좌표(x, deltaX) -> 캔버스 월드 좌표(setCamera)로 바뀌는 것에 주목
    [setCamera],
  );

  /**
   * 패닝 시작 리스너
   */
  const handleMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Start panning if spacebar is pressed or middle mouse button
    if (isSpacePressedRef.current || e.button === 1) {
      e.preventDefault();
      isPanningRef.current = true;

      const rect = canvas.getBoundingClientRect();
      lastMousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      canvas.style.cursor = 'grabbing';
    }
  }, []);

  /**
   * 스페이스바 리스너
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' && !e.repeat) {
      e.preventDefault();
      isSpacePressedRef.current = true;

      const canvas = canvasRef.current;
      if (canvas && !isPanningRef.current) {
        canvas.style.cursor = 'grab';
      }
    }
  }, []);

  /**
   * 스페이스바 중단 리스너
   */
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      isSpacePressedRef.current = false;
      setIsSpacePressed(false);

      const canvas = canvasRef.current;
      if (canvas && !isPanningRef.current) {
        canvas.style.cursor = 'default';
      }
    }
  }, []);

  /**
   * 좌표 표시용 디스플레이
   */
  const drawDebugInfo = useCallback((ctx: CanvasRenderingContext2D, currentCamera: CameraState) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '12px monospace';

    const info = [
      `Camera: (${currentCamera.x.toFixed(1)}, ${currentCamera.y.toFixed(1)})`,
      `Scale: ${(currentCamera.z * 100).toFixed(1)}%`,
      `Zoom: ${currentCamera.z.toFixed(3)}x`,
    ];

    info.forEach((text, index) => {
      ctx.fillText(text, 10, 20 + index * 18);
    });

    // Instructions
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    const instructions = [
      'Mouse wheel: Zoom at cursor',
      'Space + Drag: Pan',
      'Middle mouse drag: Pan',
    ];

    const canvas = canvasRef.current;
    if (canvas) {
      instructions.forEach((text, index) => {
        ctx.fillText(text, canvas.width - 180, 20 + index * 18);
      });
    }
  }, []);

  // 실제 캔버스 렌더러
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;

    // Clear canvas with background color
    ctx.fillStyle = '#1a1a2e'; // --color-bg-primary
    ctx.fillRect(0, 0, width, height);

    // world space
    const cam = cameraRef.current;
    ctx.save();
    const origin = worldToScreen({ x: 0, y: 0 }, cam, cssWidth, cssHeight);
    ctx.translate(origin.x, origin.y);
    ctx.scale(cam.z, cam.z);

    ctx.fillStyle = 'tomato';
    ctx.fillRect(-50, -50, 100, 100);

    ctx.restore();

    //debug info
    drawDebugInfo(ctx, cam);

    animationFrameRef.current = requestAnimationFrame(render);
  }, [drawDebugInfo]);

  //Event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    // Keyboard events need to be on window
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Resize observer
    const resizeObserver = new ResizeObserver(handleResize);
    const container = canvas.parentElement;
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleResize, handleKeyDown, handleMouseDown, handleMouseMove, handleMouseUp, handleKeyUp]);

  // Start render loop
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

  return { camera, canvasRef };
};

export default useCanvas;

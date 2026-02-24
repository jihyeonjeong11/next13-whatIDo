import { useCallback, useEffect, useState } from 'react';

const DEFAULT_CAMERA_STATE = { x: 0, y: 0 };

const useCamera = (canvas: HTMLCanvasElement | null) => {
  const [cameraState, setCameraState] = useState(DEFAULT_CAMERA_STATE);

  const moveCamera = useCallback((dx: number, dy: number) => {
    setCameraState((prev) => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  }, []);
  return { cameraState, moveCamera };
};

export default useCamera;

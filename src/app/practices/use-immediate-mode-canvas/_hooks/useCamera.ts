import { useCallback, useState } from 'react';

const DEFAULT_CAMERA_STATE = { x: 0, y: 0 };

const useCamera = () => {
  const [cameraState, setCameraState] = useState(DEFAULT_CAMERA_STATE);

  const moveCamera = useCallback((dx: number, dy: number) => {
    console.log('setstate');
    setCameraState((prev) => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  }, []);
  return { cameraState, moveCamera };
};

export default useCamera;

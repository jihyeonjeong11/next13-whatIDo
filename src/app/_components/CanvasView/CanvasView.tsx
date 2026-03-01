'use client';

import useCanvas from './_hooks/useCanvas';

const CanvasView = () => {
  const { canvasRef } = useCanvas();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        className="block w-full h-full outline-0 cursor-default"
      />
    </div>
  );
};

export default CanvasView;

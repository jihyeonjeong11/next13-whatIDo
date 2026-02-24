'use client';

import { useEffect, useState } from 'react';
import { useInfiniteCanvas } from '../_hooks/useInfiniteCanvas';

// https://infinitecanvas.cc/guide/what-is-an-infinite-canvas 아래 todo와 관련있는 부분만 우선 확인할 것
// lesson 1: webGpu vs webGL
// lesson 2: Shapes, NDC Coordinates, Antialiasing
// lesson 3: Scene graph, transforms pan and zoom!!!
// lesson 4: camera
// todo: camera 구현할 것
// todo: 그리드 선 그릴것

// todo: zoom 구현할 것
// figma style interface 패널 구현할 것
export const CanvasView = () => {
  const { canvasRef, onMouseDown } = useInfiniteCanvas();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        tabIndex={0}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        className="block w-full h-full outline-0 cursor-default"
      />
    </div>
  );
};

// 'use client';

// import useInfiniteCanvas from '../_hooks/useInfiniteCanvas';

// export const CanvasView = () => {
//   const { canvasRef } = useInfiniteCanvas();
//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       <canvas
//         tabIndex={0}
//         ref={canvasRef}
//         className="block w-full h-full outline-0 cursor-default bg-amber-50"
//       />
//     </div>
//   );
// };

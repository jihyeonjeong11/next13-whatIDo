'use client';

import { useEffect, useState } from 'react';
import { useInfiniteCanvas } from '../_hooks/useInfiniteCanvas';

export const CanvasView = () => {
  const [canvasRef] = useInfiniteCanvas();
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {mount && (
        <canvas
          tabIndex={0}
          ref={canvasRef}
          className="block w-full h-full outline-0 cursor-default"
        />
      )}
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

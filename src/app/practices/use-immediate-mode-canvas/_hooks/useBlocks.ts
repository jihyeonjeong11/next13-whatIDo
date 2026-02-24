import { useCallback } from 'react';

const useBlocks = () => {
  const colors = [
    0xf1f7ed, 0x61c9a8, 0x7ca982, 0xe0eec6, 0xc2a83e, 0xff99c8, 0xfcf6bd, 0x9c92a3, 0xc6b9cd,
  ];
  const texts = [
    'Infinite',
    'Canvases',
    'Are',
    'Easy',
    'When',
    'You',
    'Know',
    'The',
    'Fundamentals',
  ];

  const rectW = 500;
  const rectH = 500;
  const drawBlocks = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < 9; i++) {
      const leftOffset = (i % 3) * rectW;
      const topOffset = Math.floor(i / 3) * rectH;

      ctx.fillStyle = `#${colors[i]}`;
      ctx.fillRect(leftOffset, topOffset, rectW, rectH);

      ctx.fillStyle = '#000000';
      const centerX = leftOffset + rectW / 2;
      const centerY = topOffset + rectH / 2;
      ctx.fillText(texts[i], centerX, centerY);
    }
  }, []);

  return { drawBlocks };
};

export default useBlocks;

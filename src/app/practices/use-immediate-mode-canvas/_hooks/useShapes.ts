import { useCallback } from 'react';

const useShapes = () => {
  const drawRectangle = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    },
    [],
  );

  const drawCircle = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    },
    [],
  );

  const drawTriangle = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size / 2);
      ctx.lineTo(x - size / 2, y + size / 2);
      ctx.lineTo(x + size / 2, y + size / 2);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    },
    [],
  );

  const drawCurve = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.strokeStyle = '#c6b9cd';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.moveTo(-300, -200);
    ctx.bezierCurveTo(-200, -400, 0, -100, 100, -300);
    ctx.stroke();
  }, []);

  const drawShapes = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      drawCircle(ctx, 400, 100, 60, '#ff99c8');
      drawTriangle(ctx, -200, 400, 100, '#fcf6bd');
      drawCurve(ctx);
    },
    [drawCircle, drawTriangle, drawCurve],
  );

  const colors = [
    'honeydew',
    'mediumaquamarine',
    'darkseagreen',
    'beige',
    'goldenrod',
    'hotpink',
    'lemonchiffon',
    'thistle',
    'lavender',
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

      ctx.fillStyle = colors[i];
      ctx.fillRect(leftOffset, topOffset, rectW, rectH);

      ctx.fillStyle = '#000000';
      const centerX = leftOffset + rectW / 2;
      const centerY = topOffset + rectH / 2;
      ctx.fillText(texts[i], centerX, centerY);
    }
  }, []);

  return { drawShapes, drawCircle, drawTriangle, drawCurve, drawBlocks, drawRectangle };
};

export default useShapes;

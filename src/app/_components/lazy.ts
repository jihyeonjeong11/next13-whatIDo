'use client';
import dynamic from 'next/dynamic';

export const GraphView = dynamic(
  () => import('./graphView/GraphView').then((res) => res.GraphView),
  {
    ssr: false,
  },
);

export const CanvasView = dynamic(() => import('./CanvasView/CanvasView'), {
  ssr: false,
});

'use client';
import dynamic from 'next/dynamic';

export const GraphView = dynamic(
  () => import('./graphView/GraphView').then((res) => res.GraphView),
  {
    ssr: false,
  },
);

export const CanvasView = dynamic(
  () =>
    import('../practices/use-immediate-mode-canvas/_components/CanvasView').then(
      (res) => res.CanvasView,
    ),
  {
    ssr: false,
  },
);

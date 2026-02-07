'use client';

import { memo } from 'react';

interface EdgeLineProps {
  sourceState: { x: number; y: number };
  targetState: { x: number; y: number };
}

const EdgeLine = ({ sourceState, targetState }: EdgeLineProps) => {
  return (
    <line
      x1={sourceState.x}
      y1={sourceState.y}
      x2={targetState.x}
      y2={targetState.y}
      stroke="#4F46E5"
      strokeWidth="2"
      strokeLinecap="round"
      markerEnd="url(#arrowhead)"
    />
  );
};

export default memo(EdgeLine);

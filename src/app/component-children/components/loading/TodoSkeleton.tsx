import React from 'react';
import { BASE_ENTRY_SIZE } from '../../constants';

const TodoSkeleton = () => (
  <svg>
    <rect
      x="48"
      y="8"
      rx="3"
      ry="3"
      width={BASE_ENTRY_SIZE.width}
      height={BASE_ENTRY_SIZE.height}
    />
  </svg>
);

export default TodoSkeleton;

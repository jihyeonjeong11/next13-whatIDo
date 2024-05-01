'use client';

import React, { memo } from 'react';
import { TodoType } from '../../page';

type ChildrenType = {
  item: TodoType;
  index: number;
};

function TodoItemWithoutChildren({ item, index }: ChildrenType) {
  console.log('With memo this will not rerender');
  return (
    <div>
      <span>
        {item.label}
        {index}
      </span>
    </div>
  );
}

export default memo(TodoItemWithoutChildren);

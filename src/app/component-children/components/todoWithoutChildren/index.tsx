'use client';

import React from 'react';
import { TodoType } from '../../page';

type ChildrenType = {
  item: TodoType;
  index: number;
};

function TodoItemWithoutChildren({ item, index }: ChildrenType) {
  console.log('Without any method this will rerender');
  return (
    <div>
      <span>
        {item.label}
        {index}
      </span>
    </div>
  );
}

export default TodoItemWithoutChildren;

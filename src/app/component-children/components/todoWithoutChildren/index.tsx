'use client';

import { BASE_ITEM_STYLE } from '../../constants/index';
import type { TodoType } from '../../types';

type ChildrenType = {
  item: TodoType;
  index: number;
};

function TodoItemWithoutChildren({ item, index }: ChildrenType) {
  console.log('Without any method this will rerender');
  return (
    <div className={BASE_ITEM_STYLE}>
      <span>
        {item.label}
        {index}
      </span>
    </div>
  );
}

export default TodoItemWithoutChildren;

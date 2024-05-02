'use client';

import React, { memo } from 'react';
import { BASE_ITEM_STYLE } from '../../constants';
import { TodoType } from '../../types';

type ChildrenType = {
  item: TodoType;
  index: number;
};

function TodoItemWithMemo({ item, index }: ChildrenType) {
  console.log('With memo this will not rerender');
  return (
    <div className={BASE_ITEM_STYLE}>
      <span>
        {item.label}
        {index}
      </span>
    </div>
  );
}

export default memo(TodoItemWithMemo);

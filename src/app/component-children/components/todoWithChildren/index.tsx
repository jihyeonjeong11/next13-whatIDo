'use client';

import React from 'react';
import { TodoType } from '../../page';
import { BASE_ITEM_STYLE } from '../../constants';

type ChildrenType = {
  item: TodoType;
  index: number;
};

const TodoItemWithChildren = ({ item, index }: ChildrenType) => (
  <div className={BASE_ITEM_STYLE}>
    <span>
      {item.label}
      {index}
    </span>
  </div>
);
export default TodoItemWithChildren;

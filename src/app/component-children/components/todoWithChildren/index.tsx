'use client';

import React, { memo } from 'react';
import { BASE_ITEM_STYLE } from '../../constants';
import { TodoType } from '../../types';

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
export default memo(TodoItemWithChildren);

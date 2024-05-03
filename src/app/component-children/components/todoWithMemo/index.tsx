'use client';

import React, { memo } from 'react';
import { TodoType } from '../../types';
import TodoItem from '../common/TodoItem';

type ChildrenType = {
  item: TodoType;
  index: number;
};

function TodoItemWithMemo({ item, index }: ChildrenType) {
  console.log('With memo this will not rerender');
  return <TodoItem item={item} index={index} />;
}

export default memo(TodoItemWithMemo);

'use client';

import React from 'react';
import { TodoType } from '../../types';
import TodoItem from '../common/TodoItem';

type ChildrenType = {
  item: TodoType;
  index: number;
};

function TodoItemWithoutChildren({ item, index }: ChildrenType) {
  console.log('Without any method this will rerender');
  return <TodoItem item={item} index={index} />;
}

export default TodoItemWithoutChildren;

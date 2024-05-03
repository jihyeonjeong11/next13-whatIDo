'use client';

import React from 'react';
import { TodoType } from '../../types';
import TodoItem from '../common/TodoItem';

type ChildrenType = {
  item: TodoType;
  index: number;
};

const TodoItemWithChildren = ({ item, index }: ChildrenType) => (
  <TodoItem item={item} index={index} />
);

export default TodoItemWithChildren;

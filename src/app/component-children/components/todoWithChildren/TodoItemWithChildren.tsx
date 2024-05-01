'use client';

import React from 'react';
import { TodoType } from '../../page';

const TodoItemWithChildren = ({ item }: { item: TodoType }) => (
  <div>
    <span>{item.label}</span>
  </div>
);
export default TodoItemWithChildren;

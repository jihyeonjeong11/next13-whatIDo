'use client';

<<<<<<< Updated upstream
import React, { memo } from 'react';
import { BASE_ITEM_STYLE } from '../../constants';
=======
import React from 'react';
>>>>>>> Stashed changes
import { TodoType } from '../../types';
import TodoItem from '../common/TodoItem';

type ChildrenType = {
  item: TodoType;
  index: number;
};

const TodoItemWithChildren = ({ item, index }: ChildrenType) => (
  <TodoItem item={item} index={index} />
);
<<<<<<< Updated upstream
export default memo(TodoItemWithChildren);
=======

export default TodoItemWithChildren;
>>>>>>> Stashed changes

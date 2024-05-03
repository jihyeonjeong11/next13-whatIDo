import React from 'react';
import { BASE_ITEM_STYLE } from '../../constants';
import { TodoType } from '../../types';

type ChildrenType = {
  item: TodoType;
  index: number;
};

const TodoItem = ({ item, index }: ChildrenType) => (
  <article className={BASE_ITEM_STYLE}>
    <span>order {index + 1} : </span>
    <span>{item.label}</span>
  </article>
);

export default TodoItem;

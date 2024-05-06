'use client';

import React, { memo, useContext } from 'react';
import { BASE_ITEM_STYLE } from '../../constants';
import { TodoType } from '../../types';
import { TodoContext } from '../../contexts';

type ChildrenType = {
  item: TodoType;
  index: number;
};

const TodoItemWithChildren = ({ item, index }: ChildrenType) => {
  const { test, setTest } = useContext(TodoContext);
  console.log('with context this will rerender');
  if (!test?.test) return null;
  return (
    <>
      <div className={BASE_ITEM_STYLE}>
        <span>{test.test}</span>
      </div>
      <button type="button" onClick={() => setTest({ test: test.test + 1 })}>
        setTest
      </button>
    </>
  );
};
export default memo(TodoItemWithChildren);

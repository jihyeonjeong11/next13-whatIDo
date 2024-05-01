'use client';

import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';

export type TodoType = {
  id: string;
  label: string;
};

export type Props = {
  list: Array<TodoType>;
  addList: (value?: string) => void;
  popList: () => void;
  type: 'without' | 'withMemo' | 'withChildren';
};

const RANDOMIZABLE_TODO_LIST = [
  'do dishes',
  'cook dinner',
  'clean house',
  'be smart',
  'stop smoking',
];

export const makeListEntry = (text = '') => {
  return {
    id: uuidv4(),
    label: text
      ? text
      : RANDOMIZABLE_TODO_LIST[
          Math.floor(Math.random() * RANDOMIZABLE_TODO_LIST.length)
        ],
  };
};

const Todo = dynamic(() => import('./components/index'), { ssr: false });

export default function UseComponentChildren() {
  const [list, setList] = useState<Props['list']>(
    Array.from(Array(1), () => makeListEntry()),
  );

  const addList = useCallback((text?: string) => {
    setList((prev) => [...prev, makeListEntry(text)]);
  }, []);

  const popList = useCallback(() => {
    setList((prevList) => {
      const newList = [...prevList];
      newList.pop();
      return newList;
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex gap-4 items-center justify-center">
        <Todo list={list} addList={addList} popList={popList} type="without" />
        <Todo list={list} addList={addList} popList={popList} type="withMemo" />
        <Todo
          list={list}
          addList={addList}
          popList={popList}
          type="withChildren"
        />
      </div>
    </main>
  );
}

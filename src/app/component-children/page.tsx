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
  addList: () => void;
};

const RANDOMIZABLE_TODO_LIST = [
  'do dishes',
  'cook dinner',
  'clean house',
  'be smart',
  'stop smoking',
];

export const makeListEntry = () => ({
  id: uuidv4(),
  label:
    RANDOMIZABLE_TODO_LIST[
      Math.floor(Math.random() * RANDOMIZABLE_TODO_LIST.length)
    ],
});

const Todo = dynamic(() => import('./components/index'), { ssr: false });

export default function UseComponentChildren() {
  const [list, setList] = useState<Props['list']>(
    Array.from(Array(100), () => makeListEntry()),
  );

  const addList = useCallback(() => {
    setList((prev) => [...prev, makeListEntry()]);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex  items-center justify-center">
        <Todo list={list} addList={addList} />
      </div>
    </main>
  );
}

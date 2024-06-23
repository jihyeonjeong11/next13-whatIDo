'use client';

import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoType } from '../../types';

type UseTodoContextType = {
  list: Array<TodoType>;
  addList: (value?: string) => void;
  popList: () => void;
};

const RANDOMIZABLE_TODO_LIST = [
  'do dishes',
  'cook dinner',
  'clean house',
  'be smart',
  'stop smoking',
];

const makeListEntry = (text = '') => ({
  id: uuidv4(),
  label:
    text ||
    RANDOMIZABLE_TODO_LIST[
      Math.floor(Math.random() * RANDOMIZABLE_TODO_LIST.length)
    ],
});

const useTodoContext = (): UseTodoContextType => {
  const [list, setList] = useState<UseTodoContextType['list']>(
    Array.from(Array(100), () => makeListEntry()),
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

  return { list, addList, popList };
};

export default useTodoContext;

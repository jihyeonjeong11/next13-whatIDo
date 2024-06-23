import React, { createContext, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Props } from '../types';

const RANDOMIZABLE_TODO_LIST = [
  'do dishes',
  'cook dinner',
  'clean house',
  'be smart',
  'stop smoking',
];

export const makeListEntry = (text = '') => ({
  id: uuidv4(),
  label:
    text ||
    RANDOMIZABLE_TODO_LIST[
      Math.floor(Math.random() * RANDOMIZABLE_TODO_LIST.length)
    ],
});

export const TodoContext = createContext<Props>(null as unknown as Props);

const TodoContextHoc: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [list, setList] = useState<Props['list']>(
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

  return (
    <TodoContext.Provider value={{ list, addList, popList }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextHoc;

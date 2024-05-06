import React, { createContext, useState } from 'react';

export const TodoContext = createContext<{ test: number; setTodoState: any }>(
  null as unknown as { test: number; setTodoState: any },
);

const TodoContextHoc: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [test, setTest] = useState({ test: 123 });
  return (
    <TodoContext.Provider value={{ test: test, setTest: setTest }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextHoc;

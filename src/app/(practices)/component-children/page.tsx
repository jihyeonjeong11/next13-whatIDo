'use client';

import dynamic from 'next/dynamic';
import { TodoProvider } from './contexts/todo';

const Todo = dynamic(() => import('./components/index'), { ssr: false });

export default function UseComponentChildren() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <TodoProvider>
        <Todo type="withChildren" />
      </TodoProvider>
    </div>
  );
}

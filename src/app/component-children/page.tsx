'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import TodoContextHoc from './contexts';
import TodoSkeleton from './components/loading/TodoSkeleton';

const Todo = dynamic(() => import('./components/index'), { ssr: false });

export default function UseComponentChildren() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex gap-4 items-center justify-center">
        <TodoContextHoc>
          <Todo type="withChildren" />
        </TodoContextHoc>
      </div>
    </main>
  );
}

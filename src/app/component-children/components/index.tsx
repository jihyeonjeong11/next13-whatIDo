'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { Props } from '../page';
import TodoHandle from './TodoHandle';

const TodoItemWithoutChildren = dynamic(() => import('./todoWithoutChildren'), {
  ssr: false,
});

export default function Todo({ list, addList }: Props) {
  return (
    <section>
      <TodoHandle addList={addList} />
      {list.map((item, index) => (
        <TodoItemWithoutChildren index={index} item={item} key={item.id} />
      ))}
    </section>
  );
}

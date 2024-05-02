'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Props } from '../types';

const TodoHandle = dynamic(() => import('./TodoHandle'), { ssr: false });

const TodoItemWithoutChildren = dynamic(() => import('./todoWithoutChildren'), {
  ssr: false,
});

const TodoItemWithMemo = dynamic(() => import('./todoWithMemo'), {
  ssr: false,
});

const WithChildren = dynamic(() => import('./todoWithChildren/WithChildren'), {
  ssr: false,
});

const TodoItemWithChildren = dynamic(() => import('./todoWithChildren'), {
  ssr: false,
});

const TodoForm = dynamic(() => import('./TodoForm'), { ssr: false });

export default function Todo({ list, addList, popList, type }: Props) {
  const Item = type === 'without' ? TodoItemWithoutChildren : TodoItemWithMemo;
  const isWithChildren = type === 'withChildren';
  return (
    <section>
      <strong>{type}</strong>
      <TodoForm addList={addList} />
      <TodoHandle popList={popList} />

      {!isWithChildren &&
        list.map((item, index) => (
          <Item index={index} item={item} key={item.id} />
        ))}

      {isWithChildren && (
        <WithChildren>
          {list.map((item, index) => (
            <TodoItemWithChildren index={index} item={item} key={item.id} />
          ))}
        </WithChildren>
      )}
    </section>
  );
}

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Props } from '../types';

const TodoHandle = dynamic(() => import('./TodoHandle'), { ssr: false });

const TodoForm = dynamic(() => import('./TodoForm'), { ssr: false });

const RenderItem = dynamic(() => import('./common/RenderItem'), { ssr: false });

export default function Todo({ list, addList, popList, type }: Props) {
  return (
    <section>
      <strong>{type}</strong>
      <TodoForm addList={addList} />
      <TodoHandle popList={popList} />

      {Array.isArray(list) &&
        list.map((item, index) => (
          <RenderItem key={item.id} item={item} type={type} index={index} />
        ))}
    </section>
  );
}

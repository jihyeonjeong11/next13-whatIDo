'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Props, TodoType } from '@/app/component-children/types';
import useUselessTask from '../../hooks/useUselessTask';

const TodoItemWithoutChildren = dynamic(
  () => import('@/app/component-children/components/todoWithoutChildren'),
  {
    ssr: false,
  },
);

const TodoItemWithMemo = dynamic(
  () => import('@/app/component-children/components/todoWithMemo'),
  {
    ssr: false,
  },
);

const WithChildren = dynamic(
  () =>
    import('@/app/component-children/components/todoWithChildren/WithChildren'),
  {
    ssr: false,
  },
);

const TodoItemWithChildren = dynamic(
  () => import('@/app/component-children/components/todoWithChildren'),
  {
    ssr: false,
  },
);

export default function RenderItem({
  item,
  type,
  index,
}: {
  item: TodoType;
  index: number;
  type: Props['type'];
}) {
  const Item = type === 'without' ? TodoItemWithoutChildren : TodoItemWithMemo;
  const isWithChildren = type === 'withChildren';

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isWithChildren ? (
        <WithChildren>
          <TodoItemWithChildren item={item} index={index} />
        </WithChildren>
      ) : (
        <Item item={item} index={index} />
      )}
    </>
  );
}

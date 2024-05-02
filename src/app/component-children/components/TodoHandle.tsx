import React, { memo } from 'react';
import { Props } from '../types';

type TodoHandleType = Pick<Props, 'popList'>;

function TodoHandle({ popList }: TodoHandleType) {
  console.log('this will not rerender');
  return (
    <section className="w-[300]px flex justify-center">
      <button
        className="w-[100px] h-[30px] border border-black my-8"
        type="button"
        aria-label="addbutton"
        onClick={popList}
      >
        <span>delete</span>
      </button>
    </section>
  );
}

export default memo(TodoHandle);

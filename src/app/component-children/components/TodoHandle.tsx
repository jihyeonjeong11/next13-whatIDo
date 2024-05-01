import React, { memo } from 'react';
import { Props } from '../page';

type TodoHandleType = Pick<Props, 'addList'>;

function TodoHandle({ addList }: TodoHandleType) {
  console.log('this will not rerender');
  return (
    <div>
      <button type="button" aria-label="addbutton" onClick={addList}>
        addList
      </button>
    </div>
  );
}

export default memo(TodoHandle);

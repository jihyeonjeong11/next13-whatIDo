import React from 'react';
import { Props } from '../page';

type TodoHandleType = Pick<Props, 'addList'>;

const TodoForm = ({ addList }: TodoHandleType) => {
  return (
    <header>
      <input
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            const inputElement = event.target as HTMLInputElement;
            const value = inputElement.value.trim();
            if (value !== '') {
              addList(value);
              inputElement.value = ''; // Clear the input field after adding the item
            }
          }
        }}
        placeholder="Type anything!"
        className="h-8 w-[300px] p-2"
      />
    </header>
  );
};

export default TodoForm;

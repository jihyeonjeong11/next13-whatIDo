export type TodoType = {
  id: string;
  label: string;
};

export type Props = {
  list: Array<TodoType>;
  addList: (value?: string) => void;
  popList: () => void;
  type: 'without' | 'withMemo' | 'withChildren';
};

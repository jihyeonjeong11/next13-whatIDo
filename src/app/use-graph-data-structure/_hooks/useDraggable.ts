import { useState } from 'react';

export type Position = {
  x: number;
  y: number;
};
type Draggable = [Position, React.Dispatch<React.SetStateAction<Position>>];

const useDraggable = (initialPosition: Position): Draggable => {
  const [position, setPosition] = useState<Position>(initialPosition);
  return [position, setPosition];
};

export default useDraggable;

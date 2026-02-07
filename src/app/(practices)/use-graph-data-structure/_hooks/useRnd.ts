import useDraggable from './useDraggable';

export type Position = {
  x: number;
  y: number;
};
type RndProps = {
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
};

const DEFAUL_POSITION = { x: 0, y: 0 };

const useRnd = (): RndProps => {
  const [position, setPosition] = useDraggable(DEFAUL_POSITION);

  return { position, setPosition };
};

export default useRnd;

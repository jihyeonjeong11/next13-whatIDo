import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';
export const MIN_NODE_SIZE = {
  height: 80,
  width: 80,
};

function RndNode({
  children,
  //   entry,
  //   onDragStop,
  //   onResizeStop,
  //   zIndex,
}: {
  //   zIndex: number;
  children: React.ReactElement;
  //   entry: ProcessType;
  //   focus: (id: string) => void;
  //   onDragStop: RndDragCallback;
  //   onResizeStop: RndResizeCallback;
}) {
  return (
    <Rnd
      className="bg-amber-50 rounded-full"
      //   cancel=".cancel"
      //   dragHandleClassName="drag-handle"
      //   style={{ zIndex: zIndex }}
      //   position={{
      //     x: entry.x!,
      //     y: entry.y!,
      //   }}
      //   onDragStop={onDragStop}
      //   onResizeStop={onResizeStop}
      //   size={{ width: entry.width!, height: entry.height! }}
      //   minHeight={MIN_WINDOW_SIZE.height}
      //   minWidth={MIN_WINDOW_SIZE.width}
      //   enableResizing={
      //     entry.minimized || entry.maximized || !entry.allowResizing
      //       ? RESIZING_DISABLED
      //       : RESIZING_ENABLED
      //   }
      //   disableDragging={entry.maximized || entry.minimized}
    >
      {children}
    </Rnd>
  );
}

export default RndNode;

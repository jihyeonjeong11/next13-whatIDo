import { memo } from 'react';
import { Rnd, type RndDragCallback } from 'react-rnd';
import type { NodeType } from '../_managers/GraphManager';
export const MIN_NODE_SIZE = {
  height: 80,
  width: 80,
};

function RndNode({
  children,
  id,
  node,
  //   entry,
  onDragStop,
  //   onResizeStop,
  //   zIndex,
}: {
  id: string;
  children: React.ReactElement;
  node: NodeType;
  //   zIndex: number;
  //   entry: ProcessType;
  //   focus: (id: string) => void;
  onDragStop: (id: string) => RndDragCallback;
  //   onResizeStop: RndResizeCallback;
}) {
  return (
    <Rnd
      onDragStop={onDragStop(id)}
      className="bg-amber-50 rounded-full"
      position={node}
      //   cancel=".cancel"
      //   dragHandleClassName="drag-handle"
      //   style={{ zIndex: zIndex }}
      //   position={{
      //     x: entry.x!,
      //     y: entry.y!,
      //   }}

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

export default memo(RndNode);

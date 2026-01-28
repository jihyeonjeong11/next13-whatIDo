const DevPanel = ({ add }: { add: () => void }) => {
  return (
    <div className="p-4 w-30 border bg-white z-auto ">
      Dev panel
      <li>
        <button onClick={add} type="button">
          add node
        </button>
        <button type="button">add node</button>
      </li>
    </div>
  );
};

export default DevPanel;

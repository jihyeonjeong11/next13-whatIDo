import { HEADER_HEIGHT } from '../utils/constants';

const Header = () => {
  return (
    <div
      style={{ height: `${HEADER_HEIGHT}px` }}
      className={`flex h-[${HEADER_HEIGHT}px] bg-blue-200`}
    >
      <header>header</header>
    </div>
  );
};

export default Header;

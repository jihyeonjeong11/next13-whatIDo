import Link from 'next/link';
import { NAVIGATION_LINKS } from '../utils/constants';

const Aside = () => {
  return (
    <aside className={`pt-16 flex h-dvh bg-green-200`}>
      <div
        //role="complementary"
        className="relative flex shrink-0 flex-col gap-4 border-r bg-background p-4 transition-all ease-in-out duration-500 h-full overflow-auto items-center justify-center"
      >
        <nav className="flex flex-col gap-2 items-center justify-center">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Aside;

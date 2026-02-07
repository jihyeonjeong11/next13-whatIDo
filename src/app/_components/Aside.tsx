import Link from 'next/link';
import { ASIDE_WIDTH, NAVIGATION_LINKS } from '../utils/constants';

const Aside = () => {
  return (
    <div className={`w-[${ASIDE_WIDTH}px] flex min-h-dvh bg-green-200`}>
      <aside
        //role="complementary"
        className="relative flex shrink-0 flex-col gap-4 border-r bg-background p-4 pt-16 transition-all ease-in-out duration-500"
      >
        <nav className="flex flex-col gap-2">
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
      </aside>
    </div>
  );
};

export default Aside;

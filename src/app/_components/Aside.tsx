import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/libs/constants';

const Aside = () => {
  return (
    <aside
      className={`z-0 relative flex w-105 shrink-0 flex-col gap-4  bg-background p-4 pt-16 transition-all ease-in-out duration-500 border-r`}
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
    </aside>
  );
};

export default Aside;

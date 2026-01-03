'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: '주식 분석 (Stock)',
      href: '/use-next-tab-navigation/catchall/stock',
    },
    {
      name: '주식 분석 delay (Stock)',
      href: '/use-next-tab-navigation/catchall/delayed-stock',
    },
    {
      name: '재무 감사 (Audit)',
      href: '/use-next-tab-navigation/catchall/audit',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            F
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            FinTech Dashboard
          </span>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-blue-400 shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4 text-xs text-slate-500 font-mono">
          <div className="flex flex-col items-end">
            <span>NETWORK: EXCELLENT</span>
            <span className="text-emerald-500">SYSTEM READY</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Home, ChevronRight } from 'lucide-react';

const DOC_MAP: Record<string, { label: string; docPath: string }> = {
  'use-graph-data-structure': {
    label: 'Graph Data Structure',
    docPath: '/docs/data-structure/graph',
  },
  'use-graph-view': {
    label: 'Graph View',
    docPath: '/docs/data-structure/graph',
  },
  'use-immediate-mode-canvas': {
    label: 'Immediate Mode Canvas',
    docPath: '/docs/html-canvas/imgui-vs-rmgui',
  },
  'use-next-tab-navigation': {
    label: 'Next.js Tab Navigation',
    docPath: '/docs/nextjs/next-tab-navigation',
  },
  'use-worker': {
    label: 'Web Worker Clock',
    docPath: '/docs/react/web-worker-clock',
  },
  'why-react-query': {
    label: 'Tanstack Query POST',
    docPath: '/docs/react/tanstack-query-post',
  },
  'use-vanta-background': {
    label: 'Infinite Canvas',
    docPath: '/docs/html-canvas/infinite-canvas-implementation',
  },
  'use-post-apocalypse-tileset': {
    label: 'Canvas Implementation',
    docPath: '/docs/html-canvas/infinite-canvas-implementation',
  },
  'form-page': {
    label: 'Next.js',
    docPath: '/docs/nextjs/next-scroll-restoration',
  },
  'component-children': {
    label: 'React Components',
    docPath: '/docs/react',
  },
  'use-multistep-form': {
    label: 'Multi-step Form',
    docPath: '/docs/react',
  },
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-8 h-8 rounded-md border border-border bg-transparent text-muted-foreground cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <Sun size={16} className="dark:hidden" />
      <Moon size={16} className="dark:block hidden" />
    </button>
  );
}

export default function PracticesHeader() {
  const pathname = usePathname();
  const slug = pathname.split('/').at(-1) ?? '';
  const meta = DOC_MAP[slug];

  return (
    <header className="sticky top-0 z-50 w-full border-bbackdrop-blur-md mb-2">
      <div className="flex items-center justify-between h-14 px-4 mx-auto">
        <nav
          className="flex items-center gap-1 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Home size={14} />
            <span>Home</span>
          </Link>

          <ChevronRight size={14} className="text-border" />

          {meta ? (
            <Link href={meta.docPath} className="hover:text-foreground transition-colors">
              {meta.label}
            </Link>
          ) : (
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Blogs
            </Link>
          )}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

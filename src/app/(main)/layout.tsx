import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/libs/fumadocs/layout.shared';
import { HEADER_LINKS } from '@/libs/constants';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions} links={HEADER_LINKS}>
      {children}
    </HomeLayout>
  );
}

// import '@/app/globals.css';
// import Header from '../_components/Header';
// import Aside from '../_components/Aside';

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <Header />
//       <div className="flex flex-1 min-h-dvh">
//         <Aside />
//         {children}
//       </div>
//     </>
//   );
// }

import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/libs/fumadocs/layout.shared';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          text: 'Blog',
          url: '/docs',
          active: 'nested-url',
        },

        {
          text: 'Resume',
          url: '',
          active: 'nested-url',
        },

        {
          text: 'About',
          url: '#about',
          active: 'nested-url',
        },

        {
          text: 'Employment',
          url: '#employment',
          active: 'nested-url',
        },

        // {
        //   text: 'Recommendations',
        //   url: '#recommendations',
        //   active: 'nested-url',
        // },
      ]}
    >
      {children}
    </HomeLayout>
  );
}

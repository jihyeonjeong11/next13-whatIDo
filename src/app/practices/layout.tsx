import type { ReactNode } from 'react';

import { baseOptions } from '@/libs/fumadocs/layout.shared';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

const PracticeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DocsLayout
      tree={{
        name: 'Practices',
        children: [
          {
            type: 'page',
            name: '웹 워커를 사용해서 멈추지 않는 시계 사용하기',
            description: '',
            url: '/practices/use-worker',
          },
          {
            type: 'page',
            name: '웹 워커 docs',
            description: 'Using Web Worker in FumaDocs',
            url: '/docs/react/web-worker-clock',
          },
        ],
      }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
};

export default PracticeLayout;

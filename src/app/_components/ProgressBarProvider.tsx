'use client';

import { ProgressProvider } from '@bprogress/next/app';

// TODO: 테마 감지하려면 next-themes 필요함 https://www.fumadocs.dev/docs/ui/layouts/root-provider#theme-provider
const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider height="4px" color="gray" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  );
};

export default ProgressBarProvider;

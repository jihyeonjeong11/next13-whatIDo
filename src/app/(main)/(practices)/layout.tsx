import type { ReactNode } from 'react';

const PracticeLayout = ({ children }: { children: ReactNode }) => {
  return <div className={`pt-16 h-dvh flex-1 overflow-y-scroll`}>{children}</div>;
};

export default PracticeLayout;

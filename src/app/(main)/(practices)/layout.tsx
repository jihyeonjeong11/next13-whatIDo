import { ReactNode } from 'react';

const PracticeLayout = ({ children }: { children: ReactNode }) => {
  return <div className={`pt-16 h-dvh`}>{children}</div>;
};

export default PracticeLayout;

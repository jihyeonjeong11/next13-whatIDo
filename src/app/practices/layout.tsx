import type { ReactNode } from 'react';
import PracticesHeader from './_components/header/PracticesHeader';

const PracticeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PracticesHeader />
      {children}
    </>
  );
};

export default PracticeLayout;

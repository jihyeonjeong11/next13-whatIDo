'use client';

import { usePathname } from 'next/navigation';

const useLastPath = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').filter(Boolean).pop() || '';

  return lastSegment;
};

export default useLastPath;

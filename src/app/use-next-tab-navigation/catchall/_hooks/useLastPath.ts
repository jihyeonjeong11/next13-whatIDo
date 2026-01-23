'use client';

import { usePathname } from 'next/navigation';

const useSlug = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').filter(Boolean).pop() || '';

  return lastSegment;
};

export default useSlug;

import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh]">
      <nav>
        <Link href="/use-dynamic-routes/user">사용자 탭</Link>
        <Link href="/use-dynamic-routes/analytics">분석 탭</Link>
      </nav>
      {children}
    </div>
  );
}
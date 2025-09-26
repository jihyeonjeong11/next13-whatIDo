import React, { ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({
  user,
  analytics,
}: {
  user: ReactNode;
  analytics: ReactNode;
}) {
  return (
    <div className="h-[100vh]" style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <h1>메인 대시보드 레이아웃</h1>

      {/* 탭 내비게이션 추가 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Link href="/use-parellel-tab-navigation/user" style={{ padding: '10px', border: '1px solid gray', borderRadius: '5px' }}>
          사용자 탭
        </Link>
        <Link href="/use-parellel-tab-navigation/analytics" style={{ padding: '10px', border: '1px solid gray', borderRadius: '5px' }}>
          분석 탭
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ border: '2px solid blue', padding: '15px', flex: 1 }}>
          <h2>사용자 슬롯 (@user)</h2>
          {user}
        </div>
        <div style={{ border: '2px solid green', padding: '15px', flex: 1 }}>
          <h2>분석 슬롯 (@analytics)</h2>
          {analytics}
        </div>
      </div>
    </div>
  );
}
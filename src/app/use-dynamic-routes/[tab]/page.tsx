import { notFound } from 'next/navigation';

export default function TabPage({ params }: { params: { tab: string } }) {
  if (params.tab === 'user') {
    return <h1>사용자 페이지</h1>;
  }
  if (params.tab === 'analytics') {
    return <h1>분석 페이지</h1>;
  }
  
  notFound();
}
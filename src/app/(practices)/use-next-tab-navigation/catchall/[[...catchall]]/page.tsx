'use client';
import Stock from '../_components/Stock';
import FinancialAudit from '../_components/FinancialAudit';
import Header from '../_components/Header';
import DelayedStock from '../_components/DelayedStock';
import useSlug from '../_hooks/useLastPath';

const CatchallTabPage = () => {
  const slug = useSlug();
  const renderContent = () => {
    switch (slug) {
      case 'stock':
        return <Stock />;
      case 'delayed-stock':
        return <DelayedStock />;
      case 'audit':
        return <FinancialAudit />;
      default:
        return <Stock />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 헤더에서 어떤 route가 active한지 포커스를 담당함. */}
      <Header />
      {/* url 마지막 parameter에 따라 실제 클라이언트 컴포넌트를 렌더링함. */}
      <main>{renderContent()}</main>
    </div>
  );
};

export default CatchallTabPage;

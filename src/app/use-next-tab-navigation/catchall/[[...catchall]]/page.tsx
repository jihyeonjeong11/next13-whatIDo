'use client';
import useLastPath from '../_hooks/useLastPath';
import Stock from '../_components/Stock';
import FinancialAudit from '../_components/FinancialAudit';
import Header from '../_components/Header';

const CatchallTabPage = () => {
  const lastSegment = useLastPath();
  const renderContent = () => {
    switch (lastSegment) {
      case 'stock':
        return <Stock />;
      case 'audit':
        return <FinancialAudit />;
      default:
        return <Stock />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>{renderContent()}</main>
    </div>
  );
};

export default CatchallTabPage;

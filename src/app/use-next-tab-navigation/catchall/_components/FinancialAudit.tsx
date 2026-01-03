'use client';
const auditCategories = [
  { name: 'Equity Assets', count: 400 },
  { name: 'Cryptocurrency Holdings', count: 300 },
  { name: 'Fixed Income & Bonds', count: 200 },
  { name: 'Real Estate & Hard Assets', count: 100 },
];

const FinancialAudit = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-10 font-sans">
      <header className="flex justify-between items-end border-b border-slate-700 pb-8 mb-10">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">
            FINANCIAL AUDIT 2026
          </h1>
          <p className="text-slate-400 mt-2">
            Comprehensive Tax & Asset Exposure Report
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500 uppercase tracking-widest">
            Net Worth Value
          </div>
          <div className="text-4xl font-mono text-emerald-400">
            $12,482,901.42
          </div>
        </div>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {auditCategories.map((category) => (
          <div
            key={category.name}
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold mb-4 flex justify-between">
              {category.name}
              <span className="text-sm font-normal text-slate-500">
                {category.count} items
              </span>
            </h2>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {Array.from({ length: category.count }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-slate-500 transition-all text-xs font-mono"
                >
                  <div className="flex flex-col">
                    <span className="text-slate-300">
                      ASSET_ID_{category.name.substring(0, 3)}_{i}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      TXN_REF: {Math.random().toString(36).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400">
                      +${(Math.random() * 5000).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {(Math.random() * 100).toFixed(4)} Units
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <footer className="mt-20 pt-10 border-t border-slate-800">
        <h3 className="text-slate-500 uppercase text-xs tracking-widest mb-6">
          Compliance Disclosures
        </h3>
        <div className="columns-3 gap-10 text-[10px] text-slate-500 leading-relaxed">
          {Array.from({ length: 15 }).map((_, i) => (
            <p key={i} className="mb-4">
              Section {i + 1}.4.2: Pursuant to the Financial Transparency Act of
              2024, the assets listed herein reflect the fair market value at
              the time of snapshot. All valuations are subject to market
              volatility. This document does not constitute financial advice.
              The user acknowledges that rendering this large dataset may impact
              client-side performance. Re-evaluating the 15-year growth
              trajectory requires secondary verification through the Internal
              Revenue Service standardized protocols. This text is duplicated to
              increase the HTML size and simulate the "heaviness" of a
              legal-first document.
            </p>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default FinancialAudit;

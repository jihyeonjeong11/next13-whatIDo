'use client';
import React from 'react';
import Head from 'next/head';

const Stockdata = Array.from({ length: 1000 }).map((_, i) => ({
  date: `2024-${(i % 12) + 1}-${(i % 28) + 1}`,
  open: (150 + Math.random() * 10).toFixed(2),
  high: (160 + Math.random() * 10).toFixed(2),
  low: (140 + Math.random() * 10).toFixed(2),
  close: (155 + Math.random() * 10).toFixed(2),
  volume: Math.floor(Math.random() * 1000000),
}));

const Stock = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8 text-slate-900">
      <Head>
        <title>Heavy Stock Analysis Report | Enterprise Edition</title>
      </Head>

      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold">
          AAPL: Apple Inc. Historical Analysis
        </h1>
        <p className="text-gray-500">
          Comprehensive 10-Year Performance & Technical Indicators
        </p>
      </header>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white p-4 shadow rounded-lg border">
            <h3 className="text-sm font-bold text-gray-400">
              INDICATOR {i + 1}
            </h3>
            <p className="text-2xl font-mono text-blue-600">
              {(Math.random() * 100).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>

      <section className="bg-white shadow-xl rounded-xl overflow-hidden mb-10">
        <div className="p-4 bg-slate-800 text-white font-bold">
          Historical Price Action (1,000 Entries)
        </div>
        <div className="max-height-[600px] overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Open</th>
                <th className="p-3 border">High</th>
                <th className="p-3 border">Low</th>
                <th className="p-3 border">Close</th>
                <th className="p-3 border">Volume</th>
                <th className="p-3 border">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {Stockdata.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50 transition-colors border-b text-sm"
                >
                  <td className="p-2 border font-mono">{row.date}</td>
                  <td className="p-2 border">{row.open}</td>
                  <td className="p-2 border text-green-600">{row.high}</td>
                  <td className="p-2 border text-red-600">{row.low}</td>
                  <td className="p-2 border font-bold">{row.close}</td>
                  <td className="p-2 border font-mono text-xs">
                    {row.volume.toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Strong Buy
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose max-w-none bg-white p-8 rounded-xl shadow border">
        <h2 className="text-2xl font-bold mb-4">
          Market Terminology & Risk Disclosure
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>
              <h4 className="font-bold">Technical Term #{i + 1}</h4>
              <p className="text-sm text-gray-600">
                This section contains a long, descriptive text intended to
                simulate a content-heavy page. When React hydrates this page, it
                must parse every single one of these paragraphs, which increases
                the Total Blocking Time (TBT). This is a common pattern in
                e-commerce and financial detail pages that leads to poor Core
                Web Vitals.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Stock;

'use client';
import { useState, useEffect } from 'react';

const DelayedStock = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.time('CPU_Heavy_Task');
      let result = 0;
      for (let i = 0; i < 500_000_000; i++) {
        result += Math.sqrt(i);
      }
      console.timeEnd('CPU_Heavy_Task');

      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="p-10 text-white animate-pulse">
        주식 데이터를 불러오는 중 (인위적 지연 2초)...
      </div>
    );

  return (
    <div className="p-10 bg-slate-900 text-white">
      <h2 className="text-3xl font-bold text-emerald-400">
        Real-time Stock Analysis
      </h2>
      <p className="mt-4 text-slate-400">CPU 부하 테스트가 완료되었습니다.</p>
    </div>
  );
};

export default DelayedStock;

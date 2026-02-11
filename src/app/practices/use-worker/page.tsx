'use client';

import { useState } from 'react';
import StyledTaskbar from '../_components/use-worker/StyledTaskBar';
import NoWorkerClock from '../_components/use-worker/NoWorkerClock';
import Clock from '../_components/use-worker/clock';

export default function UseWorkerPage() {
  const [isBlocking, setIsBlocking] = useState(false);

  const handleHeavyTask = () => {
    setIsBlocking(true);

    setTimeout(() => {
      const start = Date.now();
      console.log('Main Thread Blocking Start...');

      while (Date.now() - start < 3000) {}

      console.log('Main Thread Free!');
      setIsBlocking(false);
    }, 100);
  };

  return (
    <div className="flex relative flex-col items-center justify-center gap-8 h-[calc(100vh-56px)]">
      <div className="flex flex-col items-center gap-4 p-6 border border-gray-700 rounded-lg bg-gray-900">
        <h2 className="text-xl font-bold">Main Thread Control</h2>
        <button
          type="button"
          onClick={handleHeavyTask}
          disabled={isBlocking}
          className={`px-6 py-3 rounded-full font-semibold transition-colors ${
            isBlocking ? 'bg-red-900 text-gray-400' : 'bg-red-600 hover:bg-red-500 text-white'
          }`}
        >
          {isBlocking ? 'Blocking...' : 'Run Heavy Task (3s)'}
        </button>
        <p className="text-sm text-gray-400 text-center">메인쓰레드 3초 잠금</p>
      </div>

      <StyledTaskbar $bottom={-56}>
        <span className="text-white">웹 워커 시계</span> <Clock />
      </StyledTaskbar>

      <StyledTaskbar $bottom={-20}>
        <span className="text-white">RAF 시계</span> <NoWorkerClock />
      </StyledTaskbar>
    </div>
  );
}

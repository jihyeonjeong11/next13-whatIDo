'use client';

import { useState } from 'react';
import Clock from '@/app/components/use-worker/clock';
import NoWorkerClock from '@/app/components/use-worker/NoWorkerClock';
import StyledTaskbar from '@/app/components/use-worker/StyledTaskBar';

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
    <div className="flex grow min-h-screen flex-col items-center justify-center p-24 gap-8">
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
        <p className="text-sm text-gray-400 text-center">Thread blocker for 3 secs</p>
      </div>

      <StyledTaskbar $bottom={0}>
        <span className="text-white">With Web worker</span> <Clock />
      </StyledTaskbar>

      {/* <StyledTaskbar $bottom={0}>
        <span className="text-white">Without Web worker</span> <NoWorkerClock />
      </StyledTaskbar> */}
    </div>
  );
}

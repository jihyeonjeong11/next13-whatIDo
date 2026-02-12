'use client';

import { useState } from 'react';
import StyledTaskbar from '../_components/use-worker/StyledTaskBar';
import NoWorkerClock from '../_components/use-worker/NoWorkerClock';
import Clock from '../_components/use-worker/clock';
import { WindowButton } from '../_components/ui/WindowButton';
import Image from 'next/image';

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
    <div className="flex relative flex-col items-center justify-center gap-8 h-dvh">
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

      {/* <StyledTaskbar $bottom={0} className="bg-primary-window-background">
        <span className="text-white">웹 워커 시계</span> <Clock />
      </StyledTaskbar>

      <StyledTaskbar $bottom={-20} className="bg-primary-window-background">
        <span className="text-white">RAF 시계</span> <NoWorkerClock />
      </StyledTaskbar> */}

      {/* WindowTasskbar */}
      <nav
        className={`absolute left-0 bottom-0 bg-primary-window-background w-full h-8 border-t-2 border-t-white flex justify-start gap-2 notch-safe`}
      >
        <div className="p-0.5">
          <WindowButton asChild className="p-1 h-6.5">
            <div className="flex items-center h-full w-full gap-1">
              <Image
                width={20}
                height={20}
                alt="logo"
                src="/practices/start.png"
                className="object-contain"
              />
              start
            </div>
          </WindowButton>
        </div>
        <ol className="p-0.5 flex grow gap-1"></ol>
        <div className="p-0.5">
          <div className="shrink-0 p-0.5 shadow-[inset_-1.5px_-1.5px_0_0_#fcfcfc,_inset_1.5px_1.5px_0_0_#a099a1] h-[26px] flex items-center">
            <Clock />
          </div>
        </div>
      </nav>
    </div>
  );
}

// 아 그럴리가 있겠습니까 형님

// 죄송합니다 제가 카톡을 잘 확인안하는 병이 있는데 이번에는 특히 회사 이슈때문에 알람을 꺼놓는다는게

// 다꺼놔서 확인을 못했어요

// 술먹은 다음날 제가 연락드렸어야되는것도 맞는데 죄송합니다

// 괜찮으시면 다음에 제가 한잔 사도 괜찮을까요? 다시 한번 죄송함다

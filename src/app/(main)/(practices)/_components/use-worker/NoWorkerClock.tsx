'use client';

import { useEffect, useRef, useState } from 'react';
import type { LocaleTimeDate } from '@/app/types';
import StyledClock from './clock/StyledClock';

const getLocaleTimeDate = (): LocaleTimeDate => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
    date: now.toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }),
  };
};

const NoWorkerClock = () => {
  const [now, setNow] = useState<LocaleTimeDate>(() => ({
    time: '',
    date: '',
  }));

  const { time, date } = now;
  const requestRef = useRef<number>();
  const lastSecondRef = useRef<number>(new Date().getSeconds());

  useEffect(() => {
    setNow(getLocaleTimeDate());

    const update = () => {
      const currentTime = new Date();
      const currentSecond = currentTime.getSeconds();

      if (lastSecondRef.current !== currentSecond) {
        lastSecondRef.current = currentSecond;
        setNow(getLocaleTimeDate());
      }

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <StyledClock aria-label="Clock" role="timer" title={date} suppressHydrationWarning>
      {time}
    </StyledClock>
  );
};

export default NoWorkerClock;

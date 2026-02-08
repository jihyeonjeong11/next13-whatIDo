'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FC } from 'react';
import StyledClock from './StyledClock';
import type { LocaleTimeDate } from '@/app/types';
import useWorker from '@/app/hooks/useWorker';
import { type Size, createOffscreenCanvas } from '@/app/utils/functions';
import { BASE_CLOCK_WIDTH, DEFAULT_CLOCK_SOURCE, TASKBAR_HEIGHT } from '@/libs/constants';

type ClockWorkerResponse = LocaleTimeDate | 'source';

const ClockSourceMap = {
  local: 'Local',
  ntp: 'Server',
};

const clockSize: Size = {
  height: TASKBAR_HEIGHT,
  width: BASE_CLOCK_WIDTH,
};

const Clock: FC = () => {
  const [now, setNow] = useState<LocaleTimeDate>(Object.create(null) as LocaleTimeDate);

  const { time, date } = now;
  const [clockSource] = useState(DEFAULT_CLOCK_SOURCE);

  const offScreenClockCanvas = useRef<OffscreenCanvas>();
  const supportsOffscreenCanvas = useMemo(
    () => typeof window !== 'undefined' && 'OffscreenCanvas' in window,
    [],
  );

  const clockWorkerInit = useCallback(
    () =>
      new Worker(new URL('./clock.worker', import.meta.url), {
        name: `Clock (${ClockSourceMap[clockSource]})`,
      }),
    [clockSource],
  );

  const updateTime = useCallback(
    ({ data, target: clockWorker }: MessageEvent<ClockWorkerResponse>) => {
      if (data === 'source') {
        (clockWorker as Worker).postMessage(clockSource);
      } else {
        setNow((currentNow) =>
          !offScreenClockCanvas.current || currentNow.date !== data.date ? data : currentNow,
        );
      }
    },
    [clockSource],
  );

  const currentWorker = useWorker<ClockWorkerResponse>(clockWorkerInit, updateTime);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <NOTE: Need `now` in the dependency array to ensure the clock is updated>
  const clockCallbackRef = useCallback(
    (clockContainer: HTMLDivElement | null) => {
      if (
        !offScreenClockCanvas.current &&
        currentWorker.current &&
        clockContainer instanceof HTMLDivElement
      ) {
        // biome-ignore lint/suspicious/useIterableCallbackReturn: <no return>
        [...clockContainer.children].forEach((element) => element.remove());

        offScreenClockCanvas.current = createOffscreenCanvas(
          clockContainer,
          window.devicePixelRatio,
          clockSize,
        );

        currentWorker.current.postMessage(
          {
            canvas: offScreenClockCanvas.current,
            devicePixelRatio: window.devicePixelRatio,
          },
          [offScreenClockCanvas.current],
        );
      }
    },
    [currentWorker, now],
  );

  useEffect(() => {
    offScreenClockCanvas.current = undefined;
  }, []);

  return (
    <StyledClock
      ref={supportsOffscreenCanvas ? clockCallbackRef : undefined}
      aria-label="Clock"
      role="timer"
      title={date}
      suppressHydrationWarning
    >
      {supportsOffscreenCanvas ? undefined : time}
    </StyledClock>
  );
};

export default Clock;

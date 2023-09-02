import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import {
  BASE_CLOCK_WIDTH,
  DEFAULT_CLOCK_SOURCE,
  ONE_TIME_PASSIVE_EVENT,
  TASKBAR_HEIGHT,
} from 'utils/constants';
import StyledClock from './StyledClock';
import { LocaleTimeDate } from '@/app/types';
import useWorker from '@/app/hooks/useWorker';
import { Size, createOffscreenCanvas } from '@/app/utils/functions';

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
  const [now, setNow] = useState<LocaleTimeDate>(
    Object.create(null) as LocaleTimeDate
  );

  const { time, date } = now;
  const [clockSource, setClockSource] = useState(DEFAULT_CLOCK_SOURCE);

  const offScreenClockCanvas = useRef<OffscreenCanvas>();
  const supportsOffscreenCanvas = useMemo(
    () => typeof window !== 'undefined' && 'OffscreenCanvas' in window,
    []
  );

  const clockWorkerInit = useCallback(
    () =>
      new Worker(new URL('./clock.worker', import.meta.url), {
        name: `Clock (${ClockSourceMap[clockSource]})`,
      }),
    [clockSource]
  );

  const updateTime = useCallback(
    ({ data, target: clockWorker }: MessageEvent<ClockWorkerResponse>) => {
      if (data === 'source') {
        (clockWorker as Worker).postMessage(clockSource);
      } else {
        setNow((currentNow) =>
          !offScreenClockCanvas.current || currentNow.date !== data.date
            ? data
            : currentNow
        );
      }
    },
    [clockSource]
  );

  const currentWorker = useWorker<ClockWorkerResponse>(
    clockWorkerInit,
    updateTime
  );

  const clockCallbackRef = useCallback(
    (clockContainer: HTMLDivElement | null) => {
      if (
        !offScreenClockCanvas.current &&
        currentWorker.current &&
        clockContainer instanceof HTMLDivElement
      ) {
        [...clockContainer.children].forEach((element) => element.remove());

        offScreenClockCanvas.current = createOffscreenCanvas(
          clockContainer,
          window.devicePixelRatio,
          clockSize
        );

        currentWorker.current.postMessage(
          {
            canvas: offScreenClockCanvas.current,
            devicePixelRatio: window.devicePixelRatio,
          },
          [offScreenClockCanvas.current]
        );
      }
    },
    // NOTE: Need `now` in the dependency array to ensure the clock is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentWorker, now]
  );

  useEffect(() => {
    offScreenClockCanvas.current = undefined;
  }, [clockSource]);

  return (
    <StyledClock ref={supportsOffscreenCanvas ? clockCallbackRef : undefined}>
      {supportsOffscreenCanvas ? undefined : time}
    </StyledClock>
  );
};

export default Clock;

export type ClockSource = 'local' | 'ntp';

export const TASKBAR_HEIGHT = 30;
export const BASE_CLOCK_WIDTH = 68;
export const DEFAULT_CLOCK_SOURCE: ClockSource = 'local';

export const ONE_TIME_PASSIVE_EVENT = {
  once: true,
  passive: true,
} as AddEventListenerOptions;
// to prevent scroll.

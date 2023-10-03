export type ClockSource = 'local' | 'ntp';

export const TASKBAR_HEIGHT = 30;
export const BASE_CLOCK_WIDTH = 68;
export const DEFAULT_CLOCK_SOURCE: ClockSource = 'local';

export const ONE_TIME_PASSIVE_EVENT = {
  once: true,
  passive: true,
} as AddEventListenerOptions;

export const PREVENT_SCROLL = { preventScroll: true };

export const PROCESS_DELIMITER = '__';

export const TRANSITIONS_IN_MILLISECONDS = {
  DOUBLE_CLICK: 500,
  LONG_PRESS: 500,
  MOUSE_IN_OUT: 300,
  START_MENU: 400,
  WINDOW: 250,
};

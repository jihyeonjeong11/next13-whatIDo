import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import type { Size } from './functions';

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
  TASKBAR_ITEM: 400,
};

export const MILLISECONDS_IN_SECOND = 1000;

export const MILLISECONDS_IN_MINUTE = 60000;

export const MILLISECONDS_IN_DAY = 86400000;

export const TRANSITIONS_IN_SECONDS = {
  TASKBAR_ITEM: TRANSITIONS_IN_MILLISECONDS.TASKBAR_ITEM / MILLISECONDS_IN_SECOND,
  WINDOW: TRANSITIONS_IN_MILLISECONDS.WINDOW / MILLISECONDS_IN_SECOND,
};

export const WINDOW_ID = 'window';

export const DEFAULT_THEME: string = 'defaultTheme';

export const DEFAULT_WINDOW_SIZE: Size = {
  height: 300,
  width: 405,
};

import type { HandleStyles } from 'react-rnd';

export const RESIZING_DISABLED = {
  bottom: false,
  bottomLeft: false,
  bottomRight: false,
  left: false,
  right: false,
  top: false,
  topLeft: false,
  topRight: false,
};

export const RESIZING_ENABLED = {
  bottom: true,
  bottomLeft: true,
  bottomRight: true,
  left: true,
  right: true,
  top: true,
  topLeft: true,
  topRight: true,
};

export const MIN_WINDOW_HEIGHT = 30;
export const MIN_WINDOW_WIDTH = 166;

const rndDefaults = {
  cancel: '.cancel',
  dragHandleClassName: 'handle',
  enableUserSelectHack: false,
  minHeight: `${MIN_WINDOW_HEIGHT}px`,
  minWidth: `${MIN_WINDOW_WIDTH}px`,
  resizeHandleStyles: {
    bottom: {
      bottom: '-3px',
      cursor: 'ns-resize',
      height: '6px',
    },
    bottomLeft: {
      bottom: '-3px',
      cursor: 'nesw-resize',
      height: '12px',
      left: '-3px',
      width: '12px',
    },
    bottomRight: {
      bottom: '-3px',
      cursor: 'nwse-resize',
      height: '12px',
      right: '-3px',
      width: '12px',
    },
    left: {
      cursor: 'ew-resize',
      left: '-3px',
      width: '6px',
    },
    right: {
      cursor: 'ew-resize',
      right: '-3px',
      width: '6px',
    },
    top: {
      cursor: 'ns-resize',
      height: '6px',
      top: '-3px',
    },
    topLeft: {
      cursor: 'nwse-resize',
      height: '12px',
      left: '-3px',
      top: '-3px',
      width: '12px',
    },
    topRight: {
      cursor: 'nesw-resize',
      height: '12px',
      right: '-3px',
      top: '-3px',
      width: '12px',
    },
  } as HandleStyles,
};

export const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/component-children', label: 'Component Children' },
  { href: '/form-page', label: 'Form Page' },
  { href: '/use-graph-data-structure', label: 'Graph Data Structure' },
  { href: '/use-next-tab-navigation', label: 'Tab Navigation' },
  { href: '/use-post-apocalypse-tileset', label: 'Post Apocalypse Tileset' },
  { href: '/use-vanta-background', label: 'Vanta Background' },
  { href: '/use-worker', label: 'Web Worker' },
  { href: '/why-react-query', label: 'Why React Query' },
];

export const HEADER_LINKS = [
  {
    text: 'Blog',
    url: '/docs',
  },
  {
    text: 'Resume',
    url: '',
  },
  {
    text: 'About',
    url: '#about',
  },
  {
    text: 'Skills',
    url: '#skills',
  },
  {
    text: 'Experiences',
    url: '#experiences',
  },
  // {
  //   text: 'Projects',
  //   url: '#projects',
  // },
] as LinkItemType[];

export const Skill_Cards = [
  {
    icon: '/svgs/typescript.svg',
    text: 'Typescript',
  },
  {
    icon: '/svgs/javascript.svg',
    text: 'Javascript',
  },
  {
    icon: '/svgs/react.svg',
    text: 'React',
  },
  {
    icon: '/svgs/react.svg',
    text: 'React Native',
  },
  {
    icon: '/svgs/nextdotjs.svg',
    text: 'Next.js',
  },
  {
    icon: '/svgs/vuedotjs.svg',
    text: 'Vue.js',
  },
  {
    icon: '/svgs/nodedotjs.svg',
    text: 'Node.js',
  },
  {
    icon: '/svgs/tailwindcss.svg',
    text: 'Tailwind CSS',
  },
  {
    icon: '/svgs/postgresql.svg',
    text: 'PostgreSQL',
  },
  {
    icon: '/svgs/python.svg',
    text: 'Python',
  },
  {
    icon: '/svgs/django.svg',
    text: 'Django',
  },
  {
    icon: '/svgs/googlebigquery.svg',
    text: 'Google BigQuery',
  },
];

export default rndDefaults;

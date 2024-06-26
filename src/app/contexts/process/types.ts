export type ComponentProcessProps = {
  id: string;
};

type Size = { width: number; height: number };

type PdfProcessArguments = {
  count?: number;
  page?: number;
  scale?: number;
  subTitle?: string;
};

export type RelativePosition = {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
};

type BaseProcessArguments = {
  allowResizing?: boolean;
  autoSizing?: boolean;
  backgroundColor?: string;
  hideMaximizeButton?: boolean;
  hideMinimizeButton?: boolean;
  hideTaskbarEntry?: boolean;
  hideTitlebar?: boolean;
  hideTitlebarIcon?: boolean;
  initialRelativePosition?: RelativePosition;
  libs?: string[];
  lockAspectRatio?: boolean;
  url?: string;
};

export type ProcessArguments = BaseProcessArguments & PdfProcessArguments;

export type ProcessElements = {
  componentWindow?: HTMLElement;
  peekElement?: HTMLElement;
  taskbarEntry?: HTMLElement;
};

export type Process = ProcessArguments &
  ProcessElements & {
    Component: React.ComponentType<ComponentProcessProps>;
    closing?: boolean;
    defaultSize?: Size;
    hasWindow?: boolean;
    icon: string;
    maximized?: boolean;
    minimized?: boolean;
    preferProcessIcon?: boolean;
    singleton?: boolean;
    title: string;
  };

export type Processes = Record<string, Process>;

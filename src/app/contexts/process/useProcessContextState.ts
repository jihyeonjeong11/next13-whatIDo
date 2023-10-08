'use client'
import { closeProcess, openProcess } from './functions';
import type { ProcessArguments, ProcessElements, Processes } from './types';
import { useCallback, useState } from 'react';
import { TRANSITIONS_IN_MILLISECONDS } from 'utils/constants';

type ProcessContextState = {
  // argument: (
  //   id: string,
  //   name: keyof ProcessArguments,
  //   value: ProcessArguments[keyof ProcessArguments]
  // ) => void;
  // closeProcessesByUrl: (closeUrl: string) => void;
  // closeWithTransition: (id: string) => void;
  // icon: (id: string, newIcon: string) => void;
  // linkElement: (
  //   id: string,
  //   name: keyof ProcessElements,
  //   element: HTMLElement
  // ) => void;
  // maximize: (id: string) => void;
  // minimize: (id: string) => void;
  close: (id: string, closing?: boolean) => void;

  open: (
    id: string,
    processArguments?: ProcessArguments,
    icon?: string
  ) => void;
  processes: Processes;
  // title: (id: string, newTitle: string) => void;
  // url: (id: string, newUrl: string) => void;
};

const useProcessContextState = (): ProcessContextState => {
  const [processes, setProcesses] = useState<Processes>(
    Object.create(null) as Processes
  );
  // const argument = useCallback(
  //   (
  //     id: string,
  //     name: keyof ProcessArguments,
  //     value: ProcessArguments[keyof ProcessArguments]
  //   ) => setProcesses(setProcessArgument(id, name, value)),
  //   []
  // );

  const close = useCallback(
    (id: string, closing?: boolean) => setProcesses(closeProcess(id, closing)),
    []
  );
  const open = useCallback(
    (id: string, processArguments?: ProcessArguments, initialIcon?: string) => {
      console.log(id, processArguments)
      if (id === 'ExternalURL') {
        const { url: externalUrl = '' } = processArguments || {};

        if (
          externalUrl.startsWith('http:') ||
          externalUrl.startsWith('https:')
        ) {
          window.open(
            decodeURIComponent(externalUrl),
            '_blank',
            'noopener,noreferrer'
          );
        }
      } else {
        setProcesses(openProcess(id, processArguments || {}, initialIcon));
      }
    },
    []
  );
  return {
    close,
    open,
    processes,
  };
};

export default useProcessContextState;

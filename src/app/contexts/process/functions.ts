import type {
  Process,
  Processes,
  ProcessArguments,
  ProcessElements,
} from "./types";
import { PREVENT_SCROLL, PROCESS_DELIMITER } from "utils/constants";
import directory from "./directory";

const setProcessSettings =
  (processId: string, settings: Partial<Process>) =>
  (currentProcesses: Processes): Processes => {
    const { ...newProcesses } = currentProcesses;

    if (newProcesses[processId]) {
      newProcesses[processId] = {
        ...newProcesses[processId],
        ...settings,
      };
    }

    return newProcesses;
  };

export const closeProcess =
  (processId: string, closing?: boolean) =>
  (currentProcesses: Processes): Processes => {
    console.log(currentProcesses);
    if (closing) {
      return setProcessSettings(processId, { closing })(currentProcesses);
    }

    const { [processId]: _closedProcess, ...remainingProcesses } =
      currentProcesses;

    return remainingProcesses;
  };

const createPid = (
  processId: string,
  url: string,
  currentProcesses: Processes
): string => {
  const pid = url ? `${processId}${PROCESS_DELIMITER}${url}` : processId;
  const uniquePid = (instance = 0): string => {
    const newPid = `${pid}${instance ? `${PROCESS_DELIMITER}${instance}` : ""}`;

    return currentProcesses[newPid] ? uniquePid(instance + 1) : newPid;
  };

  return uniquePid();
};

export const openProcess =
  (processId: string, processArguments: ProcessArguments, icon?: string) =>
  (currentProcesses: Processes): Processes => {
    const { url = "" } = processArguments;

    //if (libs) preloadLibs(libs); // later
    const { libs, singleton } = directory[processId] || {};

    // if (singleton) {
    //   const currentPid = Object.keys(currentProcesses).find(
    //     (pid) =>
    //       pid === processId ||
    //       pid.startsWith(`${processId}${PROCESS_DELIMITER}`)
    //   );

    //   if (currentPid) {
    //     return setProcessSettings(currentPid, { url })(currentProcesses);
    //   }
    // }

    const id = createPid(processId, url, currentProcesses);

    if (currentProcesses[id]) {
      const { componentWindow } = currentProcesses[id];

      componentWindow?.focus(PREVENT_SCROLL);

      return currentProcesses;
    }

    return directory[processId]
      ? {
          ...currentProcesses,
          [id]: {
            ...directory[processId],
            ...(typeof icon === "string" && { icon }),
            ...processArguments,
          },
        }
      : currentProcesses;
  };

export const maximizeProcess =
  (processId: string) =>
  (currentProcesses: Processes): Processes =>
    setProcessSettings(processId, {
      maximized: !currentProcesses[processId]?.maximized,
    })(currentProcesses);

export const minimizeProcess =
  (processId: string) =>
  (currentProcesses: Processes): Processes =>
    setProcessSettings(processId, {
      minimized: !currentProcesses[processId]?.minimized,
    })(currentProcesses);

export const setProcessElement =
  (processId: string, name: keyof ProcessElements, element: HTMLElement) =>
  (currentProcesses: Processes): Processes =>
    setProcessSettings(processId, { [name]: element })(currentProcesses);

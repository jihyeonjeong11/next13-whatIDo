"use client";

import { useProcesses } from "@/app/contexts/process";
import { Props } from "react-rnd";
import useResizable from "./useResizable";
import rndDefaults from "@/app/utils/constants";

// rnd event handler

const useRnd = (id: string): Props => {
  const {
    processes: {
      [id]: {
        allowResizing = true,
        autoSizing = false,
        lockAspectRatio = false,
        maximized = false,
      } = {},
    },
  } = useProcesses();
  const [size, setSize] = useResizable(id, autoSizing);

  return { size, ...rndDefaults };
};

// can pass size only for now.

export default useRnd;

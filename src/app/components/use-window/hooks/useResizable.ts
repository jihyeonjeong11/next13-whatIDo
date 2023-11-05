"use client";

import React, { useState } from "react";
import { Props } from "react-rnd";
import useDefaultSize from "./useDefaultSize";

//resize event calculator

export type Size = NonNullable<Props["size"]>;

type Resizable = [Size, React.Dispatch<React.SetStateAction<Size>>];

const useResizable = (id: string, autoSizing = false): Resizable => {
  const defaultSize = useDefaultSize(id);
  const [size, setSize] = useState<Size>(defaultSize);
  return [size, setSize];
};

export default useResizable;

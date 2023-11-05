"use client";

import { useProcesses } from "@/app/contexts/process";
import React, { useRef } from "react";
import { Rnd } from "react-rnd";
import useRnd from "../../hooks/useRnd";

type RndWindowProps = {
  id: string;
  zIndex: number;
};

const RndWindow: FC<RndWindowProps> = ({ children, id, zIndex }) => {
  const {
    // linkElement,
    processes: { [id]: process },
  } = useProcesses();
  const { Component, componentWindow, maximized, minimized } = process || {};
  const rndRef = useRef<Rnd>(Object.create(null) as Rnd);

  const rndProps = useRnd(id);
  //console.log(process);
  return (
    <Rnd
      style={{ width: 300, height: 150 }}
      default={{
        x: 150,
        y: 205,
        width: 500,
        height: 190,
      }}
      minWidth={100}
      minHeight={100} //
      // {...rndProps}
    >
      {children}
    </Rnd>
  );
};

export default RndWindow;

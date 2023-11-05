import React from "react";
import { Rnd } from "react-rnd";

const RndWindow = ({ children }) => {
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
      minHeight={100}
    >
      {children}
    </Rnd>
  );
};

export default RndWindow;

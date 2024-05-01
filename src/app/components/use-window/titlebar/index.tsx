"use client";
import React from "react";
import StyledTitlebar from "./StyledTitleBar";
import Button from "../../common/Button";
import {
  CloseIcon,
  MaximizeIcon,
  MaximizedIcon,
  MinimizeIcon,
} from "./WindowActionIcons";
import { useProcesses } from "@/app/contexts/process";
import { label } from "@/app/utils/functions";
import useWindowActions from "../hooks/useWindowActions";

type TitlebarProps = {
  id: string;
};

const TitleBar: FC<TitlebarProps> = ({ id, children }) => {
  const {
    processes: { [id]: process },

    close,
  } = useProcesses();

  const { maximized = false, minimized } = process || {};
  const { onClose, onMaximize, onMinimize } = useWindowActions(id);

  return (
    <StyledTitlebar>
      <Button>
        <figure>
          <figcaption>title</figcaption>
        </figure>
      </Button>

      <nav className="cancel">
        {!maximized && (
          <Button
            className="minimize"
            onClick={onMinimize}
            {...label("Minimize")}
          >
            <MinimizeIcon />
          </Button>
        )}
        {!maximized && (
          <Button
            className="maximize"
            //disabled={!allowResizing}
            onClick={onMaximize}
            {...label("Maximize")}
          >
            {maximized ? <MaximizedIcon /> : <MaximizeIcon />}
          </Button>
        )}
        <Button className="close" onClick={onClose} {...label("Close")}>
          <CloseIcon />
        </Button>
      </nav>
      {children}
    </StyledTitlebar>
  );
};

export default TitleBar;

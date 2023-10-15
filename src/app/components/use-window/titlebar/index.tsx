import React from "react";
import StyledTitlebar from "./StyledTitleBar";
import Button from "../../common/Button";
import { CloseIcon } from "./WindowActionIcons";
import { useProcesses } from "@/app/contexts/process";
import { label } from "@/app/utils/functions";

type TitlebarProps = {
  id: string;
};

const TitleBar: FC<TitlebarProps> = ({ id }) => {
  const {
    processes: { [id]: process },
    close,
  } = useProcesses();

  return (
    <StyledTitlebar>
      <Button>
        <figure>
          <figcaption>title</figcaption>
        </figure>
      </Button>
      <nav className="cancel">
      <Button className="close" onClick={() => close(id)} {...label("Close")}>
        <CloseIcon />
      </Button>
      </nav>
    </StyledTitlebar>
  );
};

export default TitleBar;

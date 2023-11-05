"use client";

import type { ComponentProcessProps } from "../RenderComponent";
import { useProcesses } from "@/app/contexts/process";
import StyledWindow from "./StyledWindow";
import TitleBar from "../titlebar";
import RndWindow from "./rndwindow";
import useWindowTransitions from "../hooks/useWindowTransition";

const Window: FC<ComponentProcessProps> = ({ children, id }) => {
  const {
    processes: { [id]: process },
    processes,
  } = useProcesses();
  const { backgroundColor, Component, hideTitlebar, peekElement } =
    process || {};
  const windowTransitions = useWindowTransitions(id);

  // const { foregroundId } = useSession();
  // const isForeground = id === foregroundId;
  // const { zIndex, ...focusableProps } = useFocusable(id);
  // const windowTransitions = useWindowTransitions(id);
  // const linkViewportEntry = useCallback(
  //   (viewportEntry: HTMLDivElement) =>
  //     Component &&
  //     !peekElement &&
  //     viewportEntry &&
  //     linkElement(id, 'peekElement', viewportEntry),
  //   [Component, id, linkElement, peekElement]
  // );
  return (
    <RndWindow id={id}>
      <StyledWindow
        style={{ width: 400, height: 100 }}
        $backgroundColor={backgroundColor}
        {...windowTransitions}
      >
        <div>{id}</div>
        {!hideTitlebar && <TitleBar id={id} />}
        {children}
      </StyledWindow>
    </RndWindow>
  );

  // return (
  //   <RndWindow id={id} zIndex={zIndex}>
  //     <StyledWindow
  //       $backgroundColor={backgroundColor}
  //       $isForeground={isForeground}
  //       {...focusableProps}
  //       {...windowTransitions}
  //     >
  //       <StyledPeekViewport ref={linkViewportEntry}>
  //         {!hideTitlebar && <Titlebar id={id} />}
  //         {children}
  //       </StyledPeekViewport>
  //     </StyledWindow>
  //   </RndWindow>
  // );
};

export default Window;

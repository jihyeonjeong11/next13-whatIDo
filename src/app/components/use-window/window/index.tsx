import type { ComponentProcessProps } from '../RenderComponent';
import { useProcesses } from '@/app/contexts/process';
import StyledWindow from './StyledWindow';
import TitleBar from '../titlebar';

const Window: FC<ComponentProcessProps> = ({ children, id }) => {
  const {
    processes: { [id]: process }, processes
  } = useProcesses();
  const { backgroundColor, Component, hideTitlebar, peekElement } =
    process || {};
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
    <>
      <StyledWindow $backgroundColor={backgroundColor} style={{width: 475, height: 130}}>
        <div>{id}</div>
        {!hideTitlebar && <TitleBar id={id} />}
      {children}
      </StyledWindow>
    </>
  )

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

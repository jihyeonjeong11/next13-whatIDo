import { useProcesses } from "@/app/contexts/process";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import AppsLoader from "./AppsLoader";
import { WINDOW_ID } from "@/app/utils/constants";
import Window from "./window";
import themes from "@/app/styles/use-window/themes";
import type { FeatureBundle } from "framer-motion";
import { LazyMotion } from "framer-motion";
import GlobalStyle from "@/app/styles/use-window/GlobalStyle";
import { DEFAULT_THEME } from "@/app/utils/constants";

const motionFeatures = async (): Promise<FeatureBundle> =>
  (
    await import(
      /* webpackMode: "eager" */
      "@/app/styles/use-window/motionFeatures"
    )
  ).default;

const theme = {
  main: "dark",
};

const StyledApp: FC = ({ children }) => {
  //const { themeName } = useSession();
  const { open, processes } = useProcesses();

  // theme={themes[themeName] || themes[DEFAULT_THEME]}

  return (
    <StyleSheetManager enableVendorPrefixes>
      <ThemeProvider theme={themes[DEFAULT_THEME]}>
        <GlobalStyle />
        <div>for test</div>
        <button
          aria-label="addComponent"
          onClick={() => open(WINDOW_ID, { hasWindow: true, Component:() => <div style={{width: 100, height: 100}}>{"I'm component"}</div> })}
        >
          add component
        </button>
        <LazyMotion features={motionFeatures} strict>
          <AppsLoader />
        </LazyMotion>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default StyledApp;

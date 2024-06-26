"use client";
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
import StyledTaskbar from "../use-worker/StyledTaskBar";
import Clock from "../use-worker/clock";

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
  console.log(processes);
  return (
    <StyleSheetManager enableVendorPrefixes>
      <ThemeProvider theme={themes[DEFAULT_THEME]}>
        <GlobalStyle />
        <div>for test</div>
        <button
          aria-label="addComponent"
          onClick={() =>
            open("test", {
              hasWindow: true,
            })
          }
        >
          add component
        </button>
        <LazyMotion features={motionFeatures} strict>
          <AppsLoader />
        </LazyMotion>
        <StyledTaskbar>
          <Clock />
        </StyledTaskbar>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default StyledApp;

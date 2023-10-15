import type { DefaultTheme } from "styled-components";
import colors from "./colors";
import formats from "./formats";
import sizes from "./sizes";

const defaultTheme: DefaultTheme = {
  colors,
  formats,
  name: "Dark",
  sizes,
};

export default defaultTheme;

"use client";

import styled from "styled-components";
import { TASKBAR_HEIGHT } from "../../utils/constants";

const StyledTaskbar = styled.nav`
  backdrop-filter: blur(10px);
  background-color: rgba(26, 26, 26, 0.7);
  bottom: 0;
  contain: size layout;
  height: ${TASKBAR_HEIGHT}px;
  left: 0;
  position: absolute;
  right: 0;
  width: 100vw;
  z-index: 100000;
`;

export default StyledTaskbar;

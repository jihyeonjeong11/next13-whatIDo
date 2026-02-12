'use client';

import { TASKBAR_HEIGHT } from '@/libs/constants';
import styled from 'styled-components';

const StyledTaskbar = styled.nav<{ $bottom?: number }>`
  display: flex;
  backdrop-filter: blur(10px);
    bottom: ${({ $bottom }) =>
      $bottom !== undefined ? (typeof $bottom === 'number' ? `${$bottom}px` : $bottom) : '0px'};
  contain: size layout;
  height: ${TASKBAR_HEIGHT}px;
  left: 0;
  position: absolute;
  right: 0;
`;

export default StyledTaskbar;

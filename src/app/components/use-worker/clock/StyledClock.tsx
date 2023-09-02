import styled from 'styled-components';

const StyledClock = styled.div`
  color: #ffffff;
  display: flex;
  font-size: 14;
  height: 100%;
  max-width: 86px;
  min-width: 76px;
  padding: 0 5px;
  place-content: center;
  place-items: center;
  position: absolute;
  right: 0;

  &:hover {
    background-color: grey;
  }

  &:active {
    background-color: grey;
  }
`;

export default StyledClock;

import styled from 'styled-components';

interface GrowingBarProps {
  progress: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 4px;
  background-color: #999999;
`;

export const GrowingBar = styled.div<GrowingBarProps>`
  display: flex;
  height: 4px;
  transition: width 0.5s;
  width: ${({ progress }) => progress}%;
  background-color: #792EEB;
`;
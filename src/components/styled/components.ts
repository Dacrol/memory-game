import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #222;
  color: #fff;
  height: 100vh;
  padding: 20px;
`;

export const GameTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

export const GameDescription = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-bottom: 0;
  }
`;

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
`;

export const Card = styled.div<{ color: string }>`
  width: 64px;
  height: 96px;
  background-color: gray;
  border: 1px solid white;
  &.flipped {
    background-color: ${props => props.color};
  }
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  transform: rotateY(0deg);
  &:hover {
    transform: rotateY(0deg) scale(1.1);
  }

  &.flipped {
    &:hover {
      transform: rotateY(180deg) scale(1.1);
    }
    transform: rotateY(180deg);
  }
  &.matched {
    opacity: 0.1;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      transform: rotateY(180deg) scale(1);
    }
  }
`;

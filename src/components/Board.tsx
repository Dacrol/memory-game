import React from 'react';
import { GameContext } from '../contexts/GameState';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
`;

const Card = styled.div<{ isFlipped: boolean }>`
  width: 64px;
  height: 96px;
  background-color: ${props => (props.isFlipped ? props.color : 'gray')};
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
`;

const Board: React.FC = () => {
  const { gameState, flipCard } = React.useContext(GameContext);
  const cards = gameState.cards;
  return (
    <BoardContainer>
      {cards.map((card, index) => (
        <Card
          key={index}
          color={card.color}
          isFlipped={card.isFlipped}
          className={card.isFlipped ? 'flipped' : ''}
          onClick={() => {
            flipCard(card);
          }}
        ></Card>
      ))}
    </BoardContainer>
  );
};

export default Board;

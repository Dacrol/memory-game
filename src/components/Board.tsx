import React from 'react';
import { GameContext } from '../contexts/GameContext';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
`;

const Card = styled.div<{ color: string }>`
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
  }
`;

const Board: React.FC = () => {
  const { gameState, flipCard } = React.useContext(GameContext);
  const cards = gameState.cards;
  return (
    <BoardContainer id="board-container">
      {cards.map(card => {
        const showCard = card.isFlipped || card.isMatched;
        return (
          <Card
            key={card.id}
            id={`card-${card.id}`}
            color={card.color}
            data-color={card.color}
            className={`card${showCard ? ' flipped' : ''}${
              card.isMatched ? ' matched' : ''
            }`}
            onClick={() => {
              if (!card.isFlipped) {
                flipCard(card);
              }
            }}
          ></Card>
        );
      })}
    </BoardContainer>
  );
};

export default Board;

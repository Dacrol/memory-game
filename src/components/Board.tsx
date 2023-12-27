import React from 'react';
import { GameContext } from '../contexts/GameContext';
import { BoardContainer, Card } from './styled/components';

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
              if (!card.isFlipped && !card.isMatched) {
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

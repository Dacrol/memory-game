import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Stats: React.FC = () => {
  const { gameState, resetGame } = useContext(GameContext);

  return (
    <StatsContainer>
      <p>Number of attempts: {gameState.attempts}</p>
      {gameState.cards.length === gameState.matchedCards.length && (
        <>
          <h2>You win!</h2>
          <button onClick={() => resetGame()}>Play again</button>
        </>
      )}
    </StatsContainer>
  );
};

export default Stats;

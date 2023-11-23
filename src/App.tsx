import styled from 'styled-components';
import Board from './components/Board';
import GameProvider from './contexts/GameContext';
import Stats from './components/Stats';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #222;
  color: #fff;
  height: 100vh;
  padding: 20px;
`;

const GameTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

const GameDescription = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

function App() {
  return (
    <GameProvider>
      <AppContainer>
        <GameTitle>Memory Game</GameTitle>
        <GameDescription>Match the cards to win</GameDescription>
        <Board />
        <Stats />
      </AppContainer>
    </GameProvider>
  );
}

export default App;

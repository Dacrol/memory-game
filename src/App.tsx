import styled from 'styled-components';
import Board from './components/Board';
import GameProvider from './contexts/GameState';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function App() {
  return (
    <GameProvider>
      <AppContainer>
        <h1>Memory Game</h1>
        <p>Match the cards to win</p>
        <Board />
      </AppContainer>
    </GameProvider>
  );
}

export default App;

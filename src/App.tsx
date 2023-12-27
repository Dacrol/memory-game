import Board from './components/Board';
import GameProvider from './contexts/GameContext';
import Stats from './components/Stats';
import {
  AppContainer,
  GameDescription,
  GameTitle,
} from './components/styled/components';

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

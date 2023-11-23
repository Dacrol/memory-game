import React, { createContext, useEffect, useState } from 'react';
import { shuffleArray } from '../helpers/helpers';

type Card = {
  id: number;
  isFlipped: boolean;
  isMatched: boolean;
  color: string;
};

type GameState = {
  cards: Card[];
  flippedCards: Card[];
  matchedCards: Card[];
  attempts: number;
};

type GameContextType = {
  gameState: GameState;
  flipCard: (card: Card) => void;
  resetGame: () => void;
};

const colors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FFA500',
  '#800080',
];

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  matchedCards: [],
  attempts: 0,
};

export const GameContext = createContext<GameContextType>({
  gameState: initialState,
  flipCard: () => {},
  resetGame: () => {},
});

const GameProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({ ...initialState });

  const checkForMatches = (gameState: GameState) => {
    const flippedCards = gameState.flippedCards;

    if (flippedCards.length === 2) {
      if (flippedCards[0].color === flippedCards[1].color) {
        flippedCards[0].isMatched = true;
        flippedCards[1].isMatched = true;
      }
      flippedCards[0].isFlipped = false;
      flippedCards[1].isFlipped = false;
      gameState.attempts++;
    }

    const matchedCards = gameState.cards.filter(card => card.isMatched);

    setGameState({
      ...gameState,
      cards: [...gameState.cards],
      flippedCards: [],
      matchedCards,
    });
  };

  const flipCard = (card: Card) => {
    card.isFlipped = !card.isFlipped;

    const flippedCards = gameState.cards.filter(card => card.isFlipped);
    const newGameState = {
      ...gameState,
      cards: [...gameState.cards],
      flippedCards,
    };
    setGameState(newGameState);
    setTimeout(() => {
      checkForMatches(newGameState);
    }, 1000);
  };

  const resetGame = () => {
    generateCards();
  };

  const generateCards = () => {
    const newCards: Card[] = [];
    let id = 1;

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];

      newCards.push({ id: id++, isFlipped: false, color, isMatched: false });
      newCards.push({ id: id++, isFlipped: false, color, isMatched: false });
    }

    const shuffledCards = shuffleArray(newCards);

    setGameState({ ...initialState, cards: shuffledCards });
  };

  useEffect(() => {
    generateCards();
  }, []);

  return (
    <GameContext.Provider value={{ gameState, flipCard, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

import React, { createContext, useEffect, useState } from 'react';

type Card = {
  id: number;
  isFlipped: boolean;
  color: string;
};

type GameState = {
  cards: Card[];
  flippedCards: Card[];
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
};

export const GameContext = createContext<GameContextType>({
  gameState: initialState,
  flipCard: () => {},
  resetGame: () => {},
});

const GameProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
  });

  const flipCard = (card: Card) => {
    if (card.isFlipped) {
      return;
    }

    card.isFlipped = true;

    const flippedCards = [...gameState.flippedCards, card];

    if (flippedCards.length === 2) {
      console.log(flippedCards);
    }

    setGameState({
      ...gameState,
      cards: [...gameState.cards],
      flippedCards,
    });
  };

  const resetGame = () => {
    generateCards();
  };

  const generateCards = () => {
    const newCards: Card[] = [];
    let id = 1;

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];

      newCards.push({ id: id++, isFlipped: false, color });
      newCards.push({ id: id++, isFlipped: false, color });
    }

    const shuffledCards = shuffleArray(newCards);

    setGameState({
      cards: shuffledCards,
      flippedCards: [],
    });
  };

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
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

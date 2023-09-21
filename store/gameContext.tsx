"use client";

import { createContext, useContext, useState } from "react";

import { IProvider, IGameContext, IGameState } from "@/types/context.type";
import useDelayIncreasedScore from "./useDelayIncreasedScore";

import { gamesData } from "@/datas";

const game1 = gamesData[0];
const { cards } = game1;

const reversedCards = cards
  .map((item, i) => {
    return { ...item, id: i + 1 };
  })
  .reverse();

const initialState = {
  currentGame: reversedCards,
  currentGameCardAmount: reversedCards.length,
  score: 0,
  previousScore: 0,
};

const GameContext = createContext<IGameContext>({} as IGameContext);

const GameContextProvider: React.FC<IProvider> = ({ children }) => {
  const [options, setOptions] = useState<IGameState>(initialState);

  useDelayIncreasedScore({ options, setOptions });

  const handleSetOptions = (settings: IGameState) => {
    setOptions((state) => ({ ...state, ...settings }));
  };

  return (
    <GameContext.Provider value={{ game: options, handleSetOptions }}>
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a AuthProvider");
  }
  return context;
};

export { GameContextProvider, useGameContext };

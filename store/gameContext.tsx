"use client";
import { createContext, useContext, useState } from "react";
import { type Game } from "@/types/games.type";

const useGameState = (initialGame: Game) => useState<Game>(initialGame);

const GameContext = createContext<ReturnType<typeof useGameState> | null>(null);

const GameProvider = ({
  game: initialGame,
  children,
}: {
  game: Game;
  children: React.ReactNode;
}) => {
  const [game, setGame] = useGameState(initialGame);

  return (
    <GameContext.Provider value={[game, setGame]}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

export const useGameContext = () => {
  const user = useContext(GameContext);
  if (!user) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return user;
};

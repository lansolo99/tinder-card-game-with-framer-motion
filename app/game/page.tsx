"use client";

import { useGameContext } from "@/store/gameContext";
import { GameCard } from "./_components";

const Game = () => {
  const { game, handleSetOptions } = useGameContext();
  const { currentGame } = game;

  return (
    <main className="container mx-auto bg-red-500 flex p-5 flex-col justify-center items-center overflow-hidden">
      <div
        id="cardsWrapper"
        className="flex flex-col gap-4 w-full aspect-[100/150] max-w-xs mt-6 relative"
      >
        {currentGame.map((card, i) => {
          return <GameCard key={`card-${i}`} data={card} id={i} />;
        })}
      </div>
    </main>
  );
};

export default Game;

import { useRef } from "react";
import { useGameContext } from "@/store/gameContext";
import { getInitialGame } from "@/api/games.api";

import { Button } from "@/components/ui";

const GameCompletion = () => {
  const { game, handleSetOptions } = useGameContext();
  const newGame = getInitialGame();

  const memoizedStats = useRef({
    score: structuredClone(game.score),
    currentGameCardAmount: structuredClone(game.currentGameCardAmount),
  });

  return (
    <div
      className={`flex p-5 min-h-screen h-full flex-col items-center justify-center  bg-green-300 text-green-900`}
    >
      <h1 className="uppercase text-5xl md:text-[60px] leading-tight font-acuminMedium">
        Quiz complete!
      </h1>
      <p className="text-2xl">
        Your score is {memoizedStats.current.score} on a total of{" "}
        {memoizedStats.current.currentGameCardAmount} questions.
      </p>
      <div className="mt-8">
        <Button
          onClick={() => handleSetOptions(newGame)}
          className="bg-blue-500 text-[20px] uppercase px-8 pt-6 pb-5 text-white"
        >
          Replay
        </Button>
      </div>
    </div>
  );
};

export default GameCompletion;

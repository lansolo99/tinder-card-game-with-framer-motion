import { useGameContext } from "@/store/gameContext";

import { Button } from "@/components/ui";

const GameCompletion = () => {
  const { game, handleSetOptions } = useGameContext();
  return (
    <div
      className={`flex p-5 min-h-screen h-full flex-col items-center justify-center  bg-green-300 text-green-900`}
    >
      <h1 className="uppercase text-5xl md:text-[60px] leading-tight font-acuminMedium">
        Quiz complete!
      </h1>
      <p className="text-2xl">
        Your score is {game.score} on a total of {game.currentGameCardAmount}{" "}
        questions.
      </p>
      <div className="mt-8">
        <Button className="bg-blue-500 text-[20px] uppercase px-8 pt-6 pb-5 text-white">
          Replay
        </Button>
      </div>
    </div>
  );
};

export default GameCompletion;

import { useGameContext } from "@/store/gameContext";

import { Button } from "@/components/ui";

const GameCompletion = () => {
  const { game, handleSetOptions } = useGameContext();
  return (
    <div
      className={`flex p-5 min-h-screen h-full flex-col items-center justify-center  bg-purple-500`}
    >
      <h1 className="uppercase text-[60px]">Quiz complete!</h1>
      <p className="mt-2 text-2xl">
        Your score is {game.score} on a total of {game.currentGameCardAmount}.
      </p>
      <div className="mt-4">
        <Button variant="outline">Button</Button>
      </div>
    </div>
  );
};

export default GameCompletion;

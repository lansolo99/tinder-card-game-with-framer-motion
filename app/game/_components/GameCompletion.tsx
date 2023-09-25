"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

import { BgPattern } from "@/components/ui";

import { user as initialUser } from "@/api/user.api";
import { games, getInitialGame } from "@/api/games.api";

import { useUserContext } from "@/store/userContext";
import { useGameContext } from "@/store/gameContext";

const GameCompletion = () => {
  const [game, setGame] = useGameContext();

  const cardsAmount = games[game.id].cards.length;

  const initialGame = getInitialGame(0);

  const [user, setUser] = useUserContext();

  const memoizedStats = useRef({
    score: structuredClone(user.score),
    cardsAmount: structuredClone(cardsAmount),
  });

  const handleReplay = () => {
    setUser(initialUser);
    setGame(initialGame);
  };

  return (
    <div
      className={`flex p-5 min-h-screen h-full flex-col items-center justify-center  bg-gameSwipe.neutral text-gray-700`}
    >
      <BgPattern />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { ease: "backOut", duration: 0.2, delay: 0.15 },
        }}
        className="flex flex-col items-center justify-center text-center relative z-10"
      >
        <h1 className="text-5xl md:text-[60px] leading-tight font-acuminMedium">
          Quiz complete!
        </h1>
        <p className="text-2xl font-acuminMedium  text-gray-800/70">
          Your score is {memoizedStats.current.score} on a total of{" "}
          {memoizedStats.current.cardsAmount} questions.
        </p>
        <motion.div className="mt-8" whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => handleReplay()}
            className="bg-blue-500 text-[20px] uppercase px-8 pt-6 pb-5 text-white"
          >
            Replay
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameCompletion;

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useGameContext } from "@/store/gameContext";
import { easeOutExpo } from "@/lib/easings.data";

import { GameActionBtn, GameCard } from "./_components";

const initialDrivenProps = {
  buttonScaleBadAnswer: 1,
  buttonScaleGoodAnswer: 1,
};

const Game = () => {
  const [cardAnimation, setCardAnimation] = useState(initialDrivenProps);
  const { game, handleSetOptions } = useGameContext();
  const { currentGame } = game;

  useEffect(() => {
    console.log("cardAnimation: ", cardAnimation);
  }, [cardAnimation]);

  const cardVariants = {
    current: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
    upcoming: {
      opacity: 0.5,
      y: 67,
      scale: 0.9,
      transition: { duration: 0.3, ease: easeOutExpo, delay: 0 },
    },
    remainings: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  };

  return (
    <main className="container min-h-screen h-full mx-auto bg-red-500 flex p-5 flex-col justify-center items-center overflow-hidden">
      <div
        id="gameUIWrapper"
        className="bg-orange-500 flex flex-col gap-6 w-full items-center justify-center"
      >
        <div
          id="cardsWrapper"
          className="w-full aspect-[100/150] max-w-xs mb-[20px] relative "
        >
          <AnimatePresence>
            {currentGame.map((card, i) => {
              const isLast = i === currentGame.length - 1;
              const isUpcoming = i === currentGame.length - 2;
              return (
                <motion.div
                  key={`card-${i}`}
                  id={`card-${card.id}`}
                  className={`relative `}
                  variants={cardVariants}
                  initial="remainings"
                  animate={
                    isLast ? "current" : isUpcoming ? "upcoming" : "remainings"
                  }
                  exit="exit"
                >
                  <GameCard
                    data={card}
                    id={card.id}
                    setCardAnimation={setCardAnimation}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div
          id="actions"
          className="flex items-center justify-center w-full  gap-4"
        >
          <GameActionBtn
            direction="left"
            ariaLabel="swipe left"
            scale={cardAnimation.buttonScaleBadAnswer}
            game={game}
            handleSetOptions={handleSetOptions}
          />
          <GameActionBtn
            direction="right"
            ariaLabel="swipe right"
            scale={cardAnimation.buttonScaleGoodAnswer}
            game={game}
            handleSetOptions={handleSetOptions}
          />
        </div>
      </div>
    </main>
  );
};

export default Game;

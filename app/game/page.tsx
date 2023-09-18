"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useGameContext } from "@/store/gameContext";
import { easeOutExpo } from "@/lib/easings.data";

import { GameCard } from "./_components";

const Game = () => {
  const { game, handleSetOptions } = useGameContext();
  const { currentGame } = game;

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
    <main className="container min-h-screen mx-auto bg-red-500 flex p-5 flex-col justify-center items-center overflow-hidden">
      <div
        id="cardsWrapper"
        className="w-full aspect-[100/150] max-w-xs mt-6 relative"
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
                <GameCard data={card} id={card.id} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Game;

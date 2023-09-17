"use client";

import { useGameContext } from "@/store/gameContext";
import { GameCard } from "./_components";

import { motion, AnimatePresence } from "framer-motion";

const Game = () => {
  const { game, handleSetOptions } = useGameContext();
  const { currentGame } = game;

  return (
    <main className="container min-h-screen mx-auto bg-red-500 flex p-5 flex-col justify-center items-center overflow-hidden">
      <div
        id="cardsWrapper"
        className="w-full aspect-[100/150] max-w-xs mt-6 relative"
      >
        <AnimatePresence>
          {currentGame.map((card, i) => {
            return (
              <motion.div
                key={`card-${i}`}
                id={`card-${card.id}`}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
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

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { GameCards, GameCompletion } from "./_components";
import { useGameContext } from "@/store/gameContext";
import { motion, AnimatePresence } from "framer-motion";

const Game = () => {
  const { game, handleSetOptions } = useGameContext();

  const isCardStockEmpty = game.currentGame.length === 0;
  const gameScreenVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <main className="container min-h-screen h-full mx-auto bg-red-500">
      <AnimatePresence mode="wait">
        {!isCardStockEmpty && (
          <motion.div
            key="gameScreen"
            id="gameScreen"
            variants={gameScreenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <GameCards />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isCardStockEmpty && (
          <motion.div
            key="gameScreen"
            id="gameCompletion"
            variants={gameScreenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1, ease: "easeIn" }}
          >
            <GameCompletion />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Game;

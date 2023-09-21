/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useGameContext } from "@/store/gameContext";
import { easeOutExpo } from "@/lib/easings.data";
import { GameActionBtn, GameCard } from "./";

type btnDirection = "left" | "right";

const initialDrivenProps = {
  buttonScaleBadAnswer: 1,
  buttonScaleGoodAnswer: 1,
  mainBgColor: "#daeff2",
};

const GameCards = () => {
  const { game, handleSetOptions } = useGameContext();
  const { currentGame, score } = game;

  const [direction, setDirection] = useState("");
  const [cardDrivenProps, setCardDrivenProps] = useState(initialDrivenProps);
  const [isDragging, setIsDragging] = useState(false);

  const handleActionBtnOnClick = (btn: btnDirection) => {
    setDirection(btn);
  };

  const handleScore = (direction: btnDirection) => {
    const currentCard = currentGame[currentGame.length - 1];
    const scoreIncrement = currentCard.answer === direction ? 1 : 0;
    return score + scoreIncrement;
  };

  useEffect(() => {
    if (["left", "right"].includes(direction))
      handleSetOptions({
        currentGame: currentGame.slice(0, -1),
        score: handleScore(direction as btnDirection),
        previousScore: score,
      });

    setDirection("");
  }, [direction]);

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
      x: direction === "left" ? -300 : 300,
      y: 40,
      rotate: direction === "left" ? -20 : 20,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  };

  return (
    <div
      className={`flex p-5 min-h-screen h-full flex-col justify-center items-center overflow-hidden ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={{ backgroundColor: cardDrivenProps.mainBgColor }}
    >
      <div
        id="gameUIWrapper"
        className="flex flex-col gap-6 w-full items-center justify-center"
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
                    setCardDrivenProps={setCardDrivenProps}
                    setIsDragging={setIsDragging}
                    isDragging={isDragging}
                    isLast={isLast}
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
            scale={cardDrivenProps.buttonScaleBadAnswer}
            onClick={() => handleActionBtnOnClick("left")}
          />
          <GameActionBtn
            direction="right"
            ariaLabel="swipe right"
            scale={cardDrivenProps.buttonScaleGoodAnswer}
            onClick={() => handleActionBtnOnClick("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default GameCards;

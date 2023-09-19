"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import SvgIconAnswerBad from "@/components/svg/icon-answer-bad.svg";

import { useGameContext } from "@/store/gameContext";
import { easeOutExpo } from "@/lib/easings.data";

import { GameCard } from "./_components";

const Game = () => {
  const [cardAnimation, setCardAnimation] = useState(1);
  const { game, handleSetOptions } = useGameContext();
  const { currentGame } = game;

  const handleChildValueChange = (newValue: number): number => {
    // Do something with the new motion value from the child
    // console.log("Motion Value from Child:", newValue);
    return newValue;
  };

  const inputX = [-400, 0, 400];
  const outputActionScaleBadAnswer = [2.5, 1, 1];

  // let drivenActionScale = useTransform(
  //   cardAnimation as any,
  //   inputX,
  //   outputActionScaleBadAnswer
  // );

  // useEffect(() => {
  //   // console.log("cardAnimation: ", cardAnimation);
  //   // console.log("handleChildValueChange: ", handleChildValueChange);
  //   console.log("drivenActionScale: ", drivenActionScale);
  // }, [cardAnimation, drivenActionScale, handleChildValueChange]);

  useEffect(() => {
    console.log("cardAnimation: ", cardAnimation);
    // console.log("drivenActionScale: ", drivenActionScale);
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
        <div id="topbar" className="w-full bg-purple-500">
          {/* countdown + close */}
        </div>
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
                    onValueChange={handleChildValueChange}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <motion.div
          id="actions"
          className="flex items-center justify-center w-full bg-blue-500"
        >
          <motion.button
            aria-label="swipe left"
            className="flex items-center justify-center w-[60px] h-[60px] rounded-full  bg-answerBad-500 shadow"
            // style={{ scale: cardAnimation }}
            // style={{ scale: drivenActionScale }}

            // style={{ transform: `scale(${handleChildValueChange})` }}

            // style={{ scale: cardAnimation }}
          >
            <SvgIconAnswerBad className="w-[24px] h-[24px]" />
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default Game;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { Player } from "@lottiefiles/react-lottie-player";
import lottieJson from "@/assets/animations/data.json";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { themeColors } from "@/lib/theme";

import { useGameContext } from "@/store/gameContext";
import { games } from "@/api/games.api";
import { useUserContext } from "@/store/userContext";

import { Card } from "@/types/games.type";
import SvgIconScoreLeaf from "@/components/svg/score-leaf.svg";

type Props = {
  id?: number;
  data: Card;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  isLast: boolean;
};

type cardSwipeDirection = "left" | "right";

const GameCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  isLast,
}: Props) => {
  const [user, setUser] = useUserContext();
  const { score, previousScore } = user;

  const [game, setGame] = useGameContext();

  const { cards } = game;
  const cardsAmount = games[game.id].cards.length;

  const hasScoreIncreased = previousScore !== score;

  const { affirmation, illustration } = data;
  const x = useMotionValue(0);

  const scoreVariants = {
    initial: {
      y: 0,
    },
    pop: {
      y: [0, -15, -20, -15, 0],
    },
  };

  const inputX = [-150, 0, 150];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 1];
  const outputActionScaleRightAnswer = [1, 1, 3];
  const outputMainBgColor = [
    themeColors.gameSwipe.left,
    themeColors.gameSwipe.neutral,
    themeColors.gameSwipe.right,
  ];

  const offsetBoundary = 150;

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);
  let drivenActionLeftScale = useTransform(
    x,
    inputX,
    outputActionScaleBadAnswer
  );
  let drivenActionRightScale = useTransform(
    x,
    inputX,
    outputActionScaleRightAnswer
  );
  let drivenBg = useTransform(x, inputX, outputMainBgColor);

  useMotionValueEvent(x, "change", (latest) => {
    //@ts-ignore
    setCardDrivenProps((state) => ({
      ...state,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }));
  });

  //TODO: move this to a custom hook
  const handleScore = (direction: cardSwipeDirection) => {
    const currentCard = cards[cards.length - 1];
    const scoreIncrement = currentCard.answer === direction ? 1 : 0;
    return score + scoreIncrement;
  };

  return (
    <>
      <motion.div
        id={`cardDrivenWrapper-${id}`}
        className="absolute bg-white p-8 rounded-lg text-center w-full aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card select-none"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <div
          id="metrics"
          className="flex w-full justify-between items-baseline"
        >
          <div className="text-gray-500">
            <span className="text-[62px] leading-none">{id}</span>
            <span className="text-[29px] ml-1">
              /<span className="ml-[2px]">{cardsAmount}</span>
            </span>
          </div>
          <div id="score" className="flex relative">
            <div className="text-[50px] text-grey-500 leading-none relative">
              <motion.div
                id="scoreValue"
                className="relative"
                variants={scoreVariants}
                initial="initial"
                animate={isLast && hasScoreIncreased ? "pop" : "initial"}
                transition={{
                  stiffness: 2000,
                  damping: 5,
                }}
              >
                {score}
              </motion.div>
              {isLast && hasScoreIncreased && (
                <div
                  id="sparks"
                  className="absolute w-[100px] h-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[2]"
                >
                  <Player
                    autoplay
                    src={lottieJson}
                    style={{ width: "100%", height: "100%" }}
                    speed={2}
                  ></Player>
                </div>
              )}
            </div>
            <SvgIconScoreLeaf className="w-[30px] h-auto relative top-[-3px]" />
          </div>
        </div>
        <div
          id="illustration"
          className="w-full mx-auto max-w-[250px] aspect-square rounded-full relative"
        >
          <Image
            priority
            className={`absolute object-cover object-center`}
            src={`/images/games/game-0-card-${illustration}.jpg`}
            fill
            sizes={`(max-width: 768px) 100vw, 250px`}
            alt="car"
            style={{
              maskImage: `url('/images/gamecard-image-mask.png')`,
              WebkitMaskImage: `url(/images/gamecard-image-mask.png)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>
        <p id="affirmation" className="mt-2 text-[20px] leading-tight">
          {affirmation}
        </p>
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute w-full aspect-[100/150] ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";

          if (isOffBoundary) {
            setGame2({
              ...game2,
              cards: game2.cards.slice(0, -1),
            });
            setUser({
              score: handleScore(direction as cardSwipeDirection),
              previousScore: score,
            });
          }
        }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default GameCard;

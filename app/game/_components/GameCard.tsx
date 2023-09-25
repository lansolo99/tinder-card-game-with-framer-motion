/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { Player } from "@lottiefiles/react-lottie-player";
import lottieJson from "@/assets/animations/data.json";
import { useMediaQuery } from "usehooks-ts";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { themeColors } from "@/lib/theme";

import { games } from "@/api/games.api";
import { useGameContext } from "@/store/gameContext";
import { useUserContext } from "@/store/userContext";
import handleScore from "../_utils/handleScore";

import { type Card } from "@/types/games.type";
import SvgIconScoreLeaf from "@/components/svg/score-leaf.svg";

type Props = {
  id?: number;
  data: Card;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  isLast: boolean;
  setIsDragOffBoundary: Dispatch<SetStateAction<any>>;
};

type cardSwipeDirection = "left" | "right";

const GameCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  isLast,
  setIsDragOffBoundary,
}: Props) => {
  const [user, setUser] = useUserContext();
  const { score, previousScore } = user;

  const [game, setGame] = useGameContext();

  const { cards } = game;
  const cardsAmount = games[game.id].cards.length;

  const [imgLoadingComplete, setImgLoadingComplete] = useState(false);
  const hasScoreIncreased = previousScore !== score;

  const { affirmation, illustration } = data;
  const x = useMotionValue(0);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const scoreVariants = {
    initial: {
      y: 0,
    },
    pop: {
      y: [0, -15, -20, -15, 0],
    },
  };

  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];
  const outputMainBgColor = [
    themeColors.gameSwipe.left,
    themeColors.gameSwipe.neutral,
    themeColors.gameSwipe.right,
  ];

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
  // let drivenBg = useTransform(x, inputX, outputMainBgColor);
  let drivenBg = useTransform(x, [-20, 0, 20], outputMainBgColor);

  useMotionValueEvent(x, "change", (latest) => {
    //@ts-ignore
    setCardDrivenProps((state) => ({
      ...state,
      cardWrapperX: latest,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }));
  });

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
          <div
            id="imgPlaceholder"
            className="bg-gameSwipe-neutral absolute object-cover w-full h-full"
            style={{
              maskImage: `url('/images/gamecard-image-mask.png')`,
              WebkitMaskImage: `url(/images/gamecard-image-mask.png)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          ></div>
          <Image
            priority
            className={`absolute object-cover object-center ${
              imgLoadingComplete ? "opacity-100" : "opacity-0"
            } duration-500 ease-out`}
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
            onLoadingComplete={(img) => setImgLoadingComplete(true)}
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
        dragElastic={isMobile ? 0.2 : 0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          const offset = info.offset.x;

          if (offset < 0 && offset < offsetBoundary * -1) {
            setIsDragOffBoundary("left");
          } else if (offset > 0 && offset > offsetBoundary) {
            setIsDragOffBoundary("right");
          } else {
            setIsDragOffBoundary(null);
          }
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setIsDragOffBoundary(null);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";

          if (isOffBoundary) {
            setGame({
              ...game,
              cards: game.cards.slice(0, -1),
            });
            setUser({
              score: handleScore({ direction, score, cards }),
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

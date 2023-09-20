/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
// import styles from "./styles.module.css";
import imageMask from "../../../assets/gamecard-image-mask.png";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { useGameContext } from "@/store/gameContext";
import { card } from "@/types/games.type";
import SvgIconScoreLeaf from "@/components/svg/score-leaf.svg";

type Props = {
  id: number;
  data: card;
  setCardAnimation: Dispatch<SetStateAction<any>>;
};

type cardSwipeDirection = "left" | "right";

const GameCard = ({ id, data, setCardAnimation }: Props) => {
  console.log("imageMask: ", imageMask.src);
  const { game, handleSetOptions } = useGameContext();
  const { currentGame, score } = game;

  const { affirmation } = data;
  const x = useMotionValue(0);

  const inputX = [-150, 0, 150];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 1];
  const outputActionScaleRightAnswer = [1, 1, 3];
  const outputMainBgColor = ["#FF0000", "#daeff2", "#94ff00"];

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

  useMotionValueEvent(drivenActionLeftScale, "change", (latest) => {
    //@ts-ignore
    setCardAnimation((state) => ({
      ...state,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }));
  });

  const handleScore = (direction: cardSwipeDirection) => {
    const currentCard = currentGame[currentGame.length - 1];
    const scoreIncrement = currentCard.answer === direction ? 1 : 0;
    return score + scoreIncrement;
  };

  return (
    <>
      <motion.div
        id={`cardDrivenWrapper-${id}`}
        className="absolute bg-white p-8  rounded-lg text-center w-full aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card"
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
          <div className="text-grey-500">
            <span className="text-[62px] leading-none">{id}</span>
            <span className="text-[29px] ml-1">
              /<span className="ml-[2px]">10</span>
            </span>
          </div>
          <div className="flex ">
            <div className="text-[50px] text-grey-500 leading-none">
              {score}
            </div>
            <SvgIconScoreLeaf className="w-[30px] h-auto" />
          </div>
        </div>
        <div
          id="illustration"
          className="w-2/3 mx-auto max-w-[200px] aspect-square rounded-full bg-green-500 mt-4 relative"
        >
          {/* <svg
            width="158"
            height="162"
            preserveAspectRatio="xMidYMid meet"
            x="0"
            y="0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="shape">
                <path
                  d="M628.06 1760.78a65.41 65.41 0 0 0-16.49 75.43l3.88 8.78a81.6 81.6 0 0 0 67.5 48.3l3.53.31a67.4 67.4 0 0 0 65.43-35.55l.33-.63a99.71 99.71 0 0 0 5.84-80.22l-1.37-3.84a61.93 61.93 0 0 0-53.1-40.91 93.16 93.16 0 0 0-69.6 23.05z"
                  fill="#d8d8d8"
                  transform="translate(-606 -1732)"
                />
              </mask>
            </defs>
            <image
              mask="url(#shape)"
              preserveAspectRatio="xMidYMid meet"
              x="0"
              y="0"
              //@ts-ignore
              xlink:href="http://newsoft.ps/wp-content/uploads/2016/06/John_Doe.jpg"
              width="100%"
              height="100%"
            />
          </svg> */}

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className={styles.mask}
          >
            <path
              fill="#000"
              d="M90.1 182c-7.2-1.6-14.4-3.8-21.1-6.6-7.4-3-14.6-6.8-21.1-11.4-8.4-5.7-15.8-12.6-22.1-20.5-10.6-13.4-16.3-30.1-16.2-47.1.1-7 1.4-14 4-20.6.5-1.4 1.1-2.8 1.7-4.1-3.4 7.7-5.8 15.9-6.9 24.8-1 7.2-.7 14.5.9 21.5 3.8 17.1 13.3 32.5 26.9 43.5 8 6.5 17.1 11.7 26.7 15.4 7.6 3 15.5 5.2 23.6 6.5 7.4 1.1 15 1.6 22.5 1.6.2 0 .4-.1.6-.1-4.5-.6-9-1.3-13.4-1.9-1.9-.3-4-.6-6.1-1z"
            />
            <path
              id="yourMask"
              fill="#000"
              d="M184.9 122.5c.9-7.2 1-14.6.2-21.9-2-18.1-8.4-34-19-47.2-11.1-14.3-26.9-24.9-44.5-29.8-11-3.2-22.7-4.1-34-2.4C71.3 23.4 56 30 43.3 40.1 30.2 50.5 21.2 62.5 16 76.7c-2.4 6.3-3.7 12.9-3.8 19.7-.1 16.3 5.4 32.5 15.5 45.5 6.1 7.7 13.3 14.4 21.5 19.9 6.5 4.4 13.4 8.2 20.6 11.1 6.7 2.7 13.6 4.8 20.6 6.5 2.1.3 4.1.6 6.3.9 4.9.7 9.9 1.5 14.8 2.1 7.4 1 14.9.9 22.3-.1 10.9-1.4 21.1-6.3 28.9-13.7 6.7-6.5 12-14.2 15.7-22.8 3.3-7.4 5.5-15.3 6.5-23.3z"
            />
            <path
              fill="#000"
              d="M191.6 102.2c-.8-7.8-2.5-15.3-5.1-22.7-6.3-17.8-16.3-32.9-30.8-44.3-14.9-12.2-33.4-19.2-52.6-20C91 14.5 79 16.6 67.8 21c-16.1 6.3-30.1 16.9-40.6 30.6-1.9 2.5-3.7 5-5.3 7.6 5.1-7.7 11.7-14.8 19.7-21.1 13-10.5 28.8-17.3 45.6-19.6 11.7-1.6 23.8-.8 35.1 2.6 18.1 5.1 34.4 15.9 45.8 30.7 10.9 13.7 17.5 30 19.6 48.6.9 7.5.8 15-.2 22.5-1.1 8.3-3.3 16.5-6.7 24.2-3.8 8.9-9.3 16.9-16.3 23.6-1.5 1.4-3.1 2.8-4.7 4 8.3-4.4 15.3-10.9 20.4-18.8 5.3-8.4 8.9-17.8 10.5-27.7 1.5-8.6 1.9-17.3.9-26z"
            />
          </svg> */}

          {/* <Image
            // className={styles.image}
            className="absolute object-cover object-center w-full h-full"
            src={`/images/games/game-0-card-car.jpg`}
            fill
            sizes={`(max-width: 768px) 100vw, 280px`}
            alt="car"
            style={{
              maskImage: `url(${imageMask.src})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          /> */}

          <Image
            // className={styles.image}
            className="absolute object-cover object-center "
            src={`/images/games/game-0-card-car.jpg`}
            fill
            sizes={`(max-width: 768px) 100vw, 280px`}
            alt="car"
            style={{
              maskImage: `url(${imageMask.src})`,
              WebkitMaskImage: `url(${imageMask.src})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          />
        </div>
        <p id="affirmation" className="mt-6 text-[20px]">
          {affirmation}
        </p>
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute w-full aspect-[100/150] hover:cursor-grab active:cursor-grab select-none`}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragEnd={(_, info) => {
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";
          if (isOffBoundary) {
            handleSetOptions({
              currentGame: currentGame.slice(0, -1),
              score: handleScore(direction as cardSwipeDirection),
            });
          }
        }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default GameCard;

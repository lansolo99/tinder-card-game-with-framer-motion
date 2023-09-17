"use client";
import {
  motion,
  useMotionValue,
  useTransform,
  cubicBezier,
  useMotionValueEvent,
  circOut,
} from "framer-motion";
import { card } from "@/types/games.type";

type Props = {
  id: number;
  data: card;
};

const GameCard = ({ id, data }: Props) => {
  const { affirmation } = data;
  const x = useMotionValue(0);

  useMotionValueEvent(x, "change", (latest) => console.log(`x:${latest}`));

  const xInput = [-200, 0, 400];

  const yOutput = [100, 0, 100];
  const rotateOutput = [-20, 0, 20];

  let y = useTransform(x, xInput, yOutput);
  let rotation = useTransform(x, xInput, rotateOutput);

  return (
    <>
      <motion.div
        id={`cardDrivenWrapper-${id}`}
        className="absolute bg-white p-4 shadow-lg rounded-lg text-center w-full aspect-[100/150] pointer-events-none   text-black origin-bottom"
        style={{ y, rotate: rotation }}
      >
        <div id="metrics" className="flex w-full  justify-between">
          <div>1/10</div>
          <div>1</div>
        </div>
        <div
          id="illustration"
          className="w-2/3 mx-auto max-w-[200px] aspect-square rounded-full bg-green-500  mt-4"
        ></div>
        <p id="affirmation" className="mt-6">
          {affirmation}
        </p>
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className="absolute bg-blue-500/0 w-full aspect-[100/150] hover:cursor-grab active:cursor-grab select-none"
        drag="x"
        dragSnapToOrigin
        dragElastic={0.25}
        dragConstraints={{ left: -100, right: 100 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default GameCard;

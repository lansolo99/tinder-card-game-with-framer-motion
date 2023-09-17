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

  const yOutput = [200, 0, 200];
  const rotateOutput = [-20, 0, 20];

  let y = useTransform(x, xInput, yOutput);
  let rotation = useTransform(x, xInput, rotateOutput);

  return (
    <motion.div
      id={`cardWrapper-${id}`}
      className="absolute bg-white p-4 shadow-lg rounded-lg text-center w-full aspect-[100/150] hover:cursor-grab active:cursor-grab text-black origin-bottom"
      drag="x"
      // whileDrag={{ scale: 1.015 }}
      // whileTap={{ scale: 1.015 }}
      dragSnapToOrigin
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 0 }}
      dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
      style={{ x, y, rotate: rotation }}
    >
      <div id="innerCardWrapper">
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
      </div>
    </motion.div>
  );
};

export default GameCard;

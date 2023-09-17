"use client";
import {
  motion,
  useMotionValue,
  useTransform,
  cubicBezier,
  circOut,
} from "framer-motion";
import { card } from "@/types/games.type";

type Props = {
  id: number;
  data: card;
};

const GameCard = ({ id, data }: Props) => {
  const { affirmation } = data;
  const range = 400;
  const x = useMotionValue(0);
  let y = useTransform(x, [0, range], [0, 20], { ease: circOut });
  let rotation = useTransform(x, [0, range], [0, 10], { ease: circOut });

  return (
    <motion.div
      id={`cardWrapper-${id}`}
      className="absolute bg-white p-4 shadow-lg rounded-lg text-center w-full aspect-[100/150] hover:cursor-grab active:cursor-grab text-black "
      drag="x"
      // whileDrag={{ scale: 1.015 }}
      // whileTap={{ scale: 1.015 }}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
      style={{ x, y, rotate: rotation }}
      // style={{ x, y }}
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
  );
};

export default GameCard;

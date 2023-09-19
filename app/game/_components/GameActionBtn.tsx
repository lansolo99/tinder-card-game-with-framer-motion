import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import SvgIconAnswerBad from "@/components/svg/icon-answer-bad.svg";
import SvgIconAnswerGood from "@/components/svg/icon-answer-good.svg";

import { IGameState } from "@/types/context.type";

const actionPropsMatrix = {
  left: {
    ariaLabel: "Swipe Left",
    bgColorClass: "bg-answerBad-500",
    icon: SvgIconAnswerBad,
  },
  right: {
    ariaLabel: "Swipe Right",
    bgColorClass: "bg-answerGood-500",
    icon: SvgIconAnswerGood,
  },
};

type Props = {
  ariaLabel: string;
  scale: number;
  direction: "left" | "right";
  game: IGameState;
  handleSetOptions: Dispatch<SetStateAction<any>>;
};

const GameActionBtn = ({ scale, direction, game, handleSetOptions }: Props) => {
  const Icon: React.ElementType = actionPropsMatrix[direction!].icon;
  return (
    <button
      onClick={() =>
        handleSetOptions({ currentGame: game.currentGame.slice(0, -1) })
      }
    >
      <motion.div
        className={`flex items-center justify-center w-[60px] h-[60px] rounded-full ${actionPropsMatrix[direction].bgColorClass} shadow`}
        style={{ scale: scale }}
      >
        <Icon className="w-[24px] h-[24px]" />
      </motion.div>
    </button>
  );
};

export default GameActionBtn;

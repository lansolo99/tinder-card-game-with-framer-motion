import { motion } from "framer-motion";
import SvgIconAnswerBad from "@/components/svg/icon-answer-bad.svg";
import SvgIconAnswerGood from "@/components/svg/icon-answer-good.svg";

import { IsDragOffBoundary } from "@/types/games.type";

const actionPropsMatrix = {
  left: {
    ariaLabel: "Swipe Left",
    bgColorClass: "bg-answerBad-500",
    icon: SvgIconAnswerBad,
    iconBaseColorClass: "text-[#701823]",
  },
  right: {
    ariaLabel: "Swipe Right",
    bgColorClass: "bg-answerGood-500",
    icon: SvgIconAnswerGood,
    iconBaseColorClass: "text-[#2C5B10]",
  },
};

type Props = {
  ariaLabel: string;
  scale: number;
  direction: "left" | "right";
  isDragOffBoundary: IsDragOffBoundary;
  onClick: () => void;
};

const GameActionBtn = ({
  scale,
  direction,
  isDragOffBoundary = null,
  onClick,
}: Props) => {
  const Icon: React.ElementType = actionPropsMatrix[direction!].icon;

  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.9 }}>
      <motion.div
        className={`flex items-center justify-center w-[60px] h-[60px] rounded-full ${actionPropsMatrix[direction].bgColorClass} shadow`}
        style={{ scale: scale }}
      >
        <Icon
          className={`w-[24px] h-[24px] duration-100 ease-out ${
            isDragOffBoundary != null && isDragOffBoundary === direction
              ? "text-white"
              : actionPropsMatrix[direction!].iconBaseColorClass
          }`}
        />
      </motion.div>
    </motion.button>
  );
};

export default GameActionBtn;

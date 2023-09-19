import { motion } from "framer-motion";
import SvgIconAnswerBad from "@/components/svg/icon-answer-bad.svg";
import SvgIconAnswerGood from "@/components/svg/icon-answer-good.svg";

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
};

const GameActionBtn = ({ scale, direction }: Props) => {
  const Icon: React.ElementType = actionPropsMatrix[direction!].icon;
  return (
    <motion.button
      aria-label={actionPropsMatrix[direction].ariaLabel}
      className={`flex items-center justify-center w-[60px] h-[60px] rounded-full ${actionPropsMatrix[direction].bgColorClass} shadow`}
      style={{ scale: scale }}
    >
      <Icon className="w-[24px] h-[24px]" />
    </motion.button>
  );
};

export default GameActionBtn;

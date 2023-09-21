/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, Dispatch, SetStateAction } from "react";
import { IGameState } from "@/types/context.type";

type Props = {
  options: IGameState;
  setOptions: Dispatch<SetStateAction<IGameState>>;
};

const useDelayIncreasedScore = ({ options, setOptions }: Props) => {
  const { score, previousScore } = options;
  useEffect(() => {
    console.log("useDelayIncreasedScore");
    let optionsUpdateTimeOut: string | number | NodeJS.Timeout | undefined;
    if (score !== previousScore) {
      optionsUpdateTimeOut = setTimeout(() => {
        setOptions((state) => ({ ...state, previousScore: score }));
      }, 500);
    }

    return () => {
      clearTimeout(optionsUpdateTimeOut);
    };
  }, [options]);
};
export default useDelayIncreasedScore;

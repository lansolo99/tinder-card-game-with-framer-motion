/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, Dispatch, SetStateAction } from "react";
import { type User } from "@/types/user.type";

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

const useDelayedIncreasedScore = ({ user, setUser }: Props) => {
  const { score, previousScore } = user;
  useEffect(() => {
    let userUpdateTimeOut: string | number | NodeJS.Timeout | undefined;
    if (score !== previousScore) {
      userUpdateTimeOut = setTimeout(() => {
        setUser((state) => ({ ...state, previousScore: score }));
      }, 500);
    }

    return () => {
      clearTimeout(userUpdateTimeOut);
    };
  }, [user]);
};
export default useDelayedIncreasedScore;

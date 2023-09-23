import { User } from "@/types/user.type";

export const user: User = {
  score: 0,
  previousScore: 0,
};

export const getUser = async (): Promise<User> => {
  return user;
};

export const clearUser = async (): Promise<User> => {
  return user;
};

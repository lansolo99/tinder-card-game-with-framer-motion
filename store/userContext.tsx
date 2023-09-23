"use client";
import { createContext, useContext, useState } from "react";
import { type User } from "@/types/user.type";
import useUserDelayIncreaseScore from "./useUserDelayIncreaseScore";

const useUserState = (initialUser: User) => useState<User>(initialUser);

const UserContext = createContext<ReturnType<typeof useUserState> | null>(null);

const UserProvider = ({
  user: initialUser,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useUserState(initialUser);
  useUserDelayIncreaseScore({ user, setUser });

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return user;
};

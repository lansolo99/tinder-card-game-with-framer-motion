"use client";
import React, { createContext, useState, useEffect } from "react";
import { type User } from "@/types/user.type";
import useDelayedIncreasedScore from "./useDelayedIncreasedScore";

const useUserState = (initialUser: User) => useState<User>(initialUser);

export const UserContext = createContext<ReturnType<
  typeof useUserState
> | null>(null);

export const useUserContext = () => {
  const user = React.useContext(UserContext);
  if (!user) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return user;
};

const UserProvider = ({
  user: initialUser,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useUserState(initialUser);
  useDelayedIncreasedScore({ user, setUser });

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

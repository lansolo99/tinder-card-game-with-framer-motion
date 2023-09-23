import "./globals.css";
import type { Metadata } from "next";

import UserProvider from "@/store/userContext";
import GameProvider from "@/store/gameContext";

import { getUser } from "@/api/user.api";
import { getGame } from "@/api/games.api";

export const metadata: Metadata = {
  title: "Grand jeu des écogestes",
  description: "Grand jeu des écogestes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const game = await getGame(0);

  return (
    <html lang="fr">
      <body className="font-acuminLight overflow-hidden ">
        <UserProvider user={user}>
          <GameProvider game={game}>{children}</GameProvider>
        </UserProvider>
      </body>
    </html>
  );
}

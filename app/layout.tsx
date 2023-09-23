import "./globals.css";
import type { Metadata } from "next";

import { GameContextProvider } from "@/store/gameContext";
import UserProvider from "@/store/userContext";

import { getUser } from "@/api/user.api";

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

  return (
    <html lang="fr">
      <body className="font-acuminLight overflow-hidden ">
        <UserProvider user={user}>
          <GameContextProvider>{children}</GameContextProvider>
        </UserProvider>
      </body>
    </html>
  );
}

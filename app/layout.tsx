import "./globals.css";
import type { Metadata } from "next";
import { GameContextProvider } from "@/store/gameContext";

export const metadata: Metadata = {
  title: "Grand jeu des écogestes",
  description: "Grand jeu des écogestes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-acuminLight overflow-hidden ">
        <GameContextProvider>{children}</GameContextProvider>
      </body>
    </html>
  );
}

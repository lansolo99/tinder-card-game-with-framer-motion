import "./globals.css";
import type { Metadata } from "next";
import { GameContextProvider } from "@/store/gameContext";
// import PageTransition from "@/components/ui/pageTransition";

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
        {/* <PageTransition> */}
        <GameContextProvider>{children}</GameContextProvider>
        {/* </PageTransition> */}
      </body>
    </html>
  );
}

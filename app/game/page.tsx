import React from "react";

import { gamesData } from "@/datas";
import { GameCard } from "./_components";

type Props = {};

const game = (props: Props) => {
  const game1 = gamesData[0];
  const { cards } = game1;
  return (
    <main className="container mx-auto bg-red-500 flex p-5 flex-col justify-center items-center overflow-hidden">
      <div
        id="cardsWrapper"
        className="flex flex-col gap-4 w-full aspect-[100/150] max-w-xs mt-6 relative"
      >
        {cards.map((card, i) => {
          return <GameCard key={`card-${i}`} data={card} id={i} />;
        })}
      </div>
    </main>
  );
};

export default game;

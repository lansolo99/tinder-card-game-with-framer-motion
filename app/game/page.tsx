import React from "react";

import { gamesData } from "@/datas";
import { Card } from "./_components";

type Props = {};

const game = (props: Props) => {
  const game1 = gamesData[0];
  const { cards } = game1;
  return (
    <div className="container mx-auto bg-red-500 flex p-10 flex-col justify-center items-center">
      <p>game 1</p>
      <div className="flex flex-col gap-4 max-w-xs mt-6">
        {cards.map((card, i) => {
          return <Card key={`card-${i}`} data={card} />;
        })}
      </div>
    </div>
  );
};

export default game;

import React from "react";
import { card } from "@/types/games.type";

type Props = {
  data: card;
};

const Card = ({ data }: Props) => {
  const { affirmation } = data;
  return (
    <div className="bg-white p-4 shadow-md rounded text-center">
      <p className="text-black">{affirmation}</p>
    </div>
  );
};

export default Card;

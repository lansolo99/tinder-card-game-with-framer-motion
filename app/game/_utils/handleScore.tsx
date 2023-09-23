import { Card, CardSwipeDirection } from "@/types/games.type";

type Props = {
  direction: CardSwipeDirection | "";
  score: number;
  cards: Card[];
};

const handleScore = ({ direction, score, cards }: Props) => {
  const currentCard = cards[cards.length - 1];
  const scoreIncrement = currentCard.answer === direction ? 1 : 0;
  return score + scoreIncrement;
};

export default handleScore;

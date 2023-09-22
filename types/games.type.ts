export type card = {
  id: number;
  affirmation: string;
  answer: string;
  revised: string;
  illustration: string;
};

export type Game = {
  id: number;
  cards: Card[];
};

export type Answer = "left" | "right";

export type Card = {
  id?: number;
  affirmation: string;
  answer: Answer;
  revised: string;
  illustration: string;
};

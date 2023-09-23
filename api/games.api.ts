import { Game, Card } from "@/types/games.type";

export const games: Game[] = [
  {
    id: 1,
    cards: [
      {
        affirmation: "More than 40% of car journeys are less than 3mi.",
        answer: "right",
        revised:
          "It's true, 40% of car journeys are LESS than 3mi, which could be done on foot or by bike.",
        illustration: "car",
      },
      {
        affirmation:
          "On average, a French person produces more than 400kg of waste per year.",
        answer: "left",
        revised:
          "A bit less: a French produces on average 380kg of waste per year, which remains far too much.",
        illustration: "waste",
      },
      {
        affirmation:
          "A Paris-New York round trip emits more than 1.5 tons of CO2 per passenger.",
        answer: "right",
        revised:
          "It's actually higher: a Paris-New York round trip emits approximately 1.75 tonnes of CO2 per passenger, the equivalent of 3 months of heating for a French person.",
        illustration: "plane",
      },
    ],
  },
];

export const getGames = async (): Promise<Game[]> => games;

export const getGame = async (gameId: number): Promise<Game> => {
  return { id: gameId, cards: reversedCards(games[gameId].cards) };
};

export const getInitialGame = (gameId: number) => {
  return { id: gameId, cards: reversedCards(games[gameId].cards) };
};

const reversedCards = (cards: Card[]) => {
  return cards
    .map((item, i) => {
      return { ...item, id: i + 1 };
    })
    .reverse();
};

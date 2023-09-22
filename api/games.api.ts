import { Game, Card } from "@/types/games.type";

export const games: Game[] = [
  {
    id: 1,
    cards: [
      {
        affirmation: "Plus de 40% des trajets en voiture font moins de 5km.",
        answer: "right",
        revised: "La plupart des trajets en voiture font moins de 5km.",
        illustration: "car",
      },
      {
        affirmation:
          "En moyenne un français produit plus de 400kg de déchets par an.",
        answer: "left",
        revised: "Nous produisons plus de 400kg de déchets par an.",
        illustration: "waste",
      },
      {
        affirmation:
          "Un aller-retour Paris New-York émet plus de 1,5 tonnes de CO2 par passager.",
        answer: "right",
        revised:
          "Un aller-retour Paris New-York émet 1,75 tonnes de CO2 par passager.",
        illustration: "plane",
      },
    ],
  },
];

export const getInitialGame = () => {
  const game1 = games[0];
  const { cards } = game1;

  const initialState = {
    currentGame: reversedCards(cards),
    currentGameCardAmount: reversedCards(cards).length,
    score: 0,
    previousScore: 0,
  };

  return initialState;
};

export const getGames = async (): Promise<Game[]> => games;

export const getGame = async (gameId: number): Promise<Card[]> => {
  const game = games[gameId];
  const { cards } = game;

  return reversedCards(cards);
};

const reversedCards = (cards: Card[]) => {
  return cards
    .map((item, i) => {
      return { ...item, id: i + 1 };
    })
    .reverse();
};

import { card } from "./games.type";

export interface IProvider {
  children: React.ReactNode;
}

export interface IGameContext {
  game: IGameState;
  handleSetOptions: (settings: IGameState) => void;
}

export interface IGameState {
  currentGame: card[];
  score: number;
}

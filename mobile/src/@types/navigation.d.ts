import { GameCardProps } from "../components/GameCard/types";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      game: GameCardProps;
    }
  }
}

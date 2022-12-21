import { TouchableOpacityProps } from "react-native";

export interface GameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
  bannerUrl: string;
}

export interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}
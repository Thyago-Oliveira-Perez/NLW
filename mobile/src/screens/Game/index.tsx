import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useRoute } from "@react-navigation/native";

import { styles } from "./styles";
import { GameCardProps } from "../../components/GameCard/types";

export function Game() {
  const route = useRoute();
  const game = route.params as GameCardProps;

  console.log(game);

  return (
    <Background>
      <SafeAreaView style={styles.container}></SafeAreaView>
    </Background>
  );
}

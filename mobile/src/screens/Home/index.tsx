import { useEffect } from "react";
import { View, Image, FlatList } from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Header } from "../../components/Header";
import { GameCard } from "../../components/GameCard";
import { styles } from "./styles";
import { GAMES } from "../../utils/games";

export function Home() {
  useEffect(() => {
    fetch("http://172.17.0.1:3033/games")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <Header
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        contentContainerStyle={styles.contentList}
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}

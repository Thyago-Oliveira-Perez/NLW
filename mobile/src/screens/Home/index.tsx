import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Header } from "../../components/Header";
import { GameCard } from "../../components/GameCard";
import { styles } from "./styles";
import { GameCardProps } from "../../components/GameCard/types";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigate = useNavigation();

  useEffect(() => {
    fetch("http://192.168.1.6:3033/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  const handleNavigate = (game: GameCardProps) => {
    navigate.navigate("game", game);
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Header
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard onPressOut={() => handleNavigate(item)} data={item} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}

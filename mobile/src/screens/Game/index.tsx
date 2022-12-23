import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { GameCardProps } from "../../components/GameCard/types";
import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Header } from "../../components/Header";
import { DuoCard } from "../../components/DuoCard";
import { GameAd } from "./types";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();

  const game = route.params as GameCardProps;

  const [gameAds, setGameAds] = useState<GameAd[]>([]);

  useEffect(() => {
    fetch(`http://192.168.1.6:3033/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setGameAds(data));
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOnConnected = () => {
    console.log("connecting...");
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        {/* Header da tela, com a logo e o botão de voltar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleGoBack()}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          {/* Utilizada para centralizar o a logo */}
          <View style={styles.invisibleIcon} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        {/* Título do jogo */}
        <Header title={game.title} subtitle={"Conecte-se e comece a jogar!"} />

        <FlatList
          data={gameAds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard adInfos={item} onConnect={() => handleOnConnected()} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            gameAds.length > 0 ? styles.flatList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}

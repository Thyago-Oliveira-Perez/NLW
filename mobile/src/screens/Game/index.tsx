import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { GameCardProps } from "../../components/GameCard/types";
import { TouchableOpacity, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Header } from "../../components/Header";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameCardProps;

  const handleGoBack = () => {
    navigation.goBack();
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
      </SafeAreaView>
    </Background>
  );
}

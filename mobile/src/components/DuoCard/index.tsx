import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { THEME } from "../../theme";
import { InfoLabel } from "../InfoLabel";

import { styles } from "./styles";
import { DuoCardProps } from "./types";

import { GameController } from "phosphor-react-native";

export function DuoCard(props: DuoCardProps) {
  return (
    <View style={styles.container}>
      <InfoLabel label={"Nome"} value={props.adInfos.name} />
      <InfoLabel
        label={"Tempo de jogo"}
        value={`${props.adInfos.yearsPlaying} anos`}
      />
      <InfoLabel
        label={"Disponibilidade"}
        value={`${props.adInfos.weekDays.length} dias \u2022 ${props.adInfos.hourStart} - ${props.adInfos.hourEnd}`}
      />
      <InfoLabel
        label={"Chamada de áudio? "}
        value={props.adInfos.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          props.adInfos.useVoiceChannel
            ? THEME.COLORS.SUCCESS
            : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={() => props.onConnect()}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Connectar</Text>
      </TouchableOpacity>
    </View>
  );
}

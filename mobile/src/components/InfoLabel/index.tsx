import React from "react";
import { View, Text } from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";
import { InfoLabelProps } from "./types";

export function InfoLabel({
  colorValue = THEME.COLORS.TEXT,
  ...props
}: InfoLabelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Text style={[styles.label, { color: colorValue }]} numberOfLines={1}>
        {props.value}
      </Text>
    </View>
  );
}

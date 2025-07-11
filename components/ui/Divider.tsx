import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface DividerProps {
  style?: ViewStyle;
  text?: string;
  color?: string;
}

export const Divider: React.FC<DividerProps> = ({
  style,
  text,
  color = "rgba(75, 85, 99, 0.3)",
}) => {
  if (text) {
    return (
      <View style={[styles.textContainer, style]}>
        <View style={[styles.line, { backgroundColor: color }]} />
        <Text style={styles.text}>{text}</Text>
        <View style={[styles.line, { backgroundColor: color }]} />
      </View>
    );
  }

  return <View style={[styles.divider, { backgroundColor: color }, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    marginVertical: 16,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
  },
  text: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 16,
  },
});

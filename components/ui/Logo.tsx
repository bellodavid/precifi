import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface LogoProps {
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
}

export const Logo: React.FC<LogoProps> = ({ size = "medium", style }) => {
  const logoSize = {
    small: { fontSize: 24, padding: 12 },
    medium: { fontSize: 32, padding: 16 },
    large: { fontSize: 40, padding: 20 },
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.logoContainer, { padding: logoSize[size].padding }]}>
        <Text style={[styles.logoText, { fontSize: logoSize[size].fontSize }]}>
          Precifi
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    backgroundColor: "#6366F1",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

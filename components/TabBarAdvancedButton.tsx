
import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const TabBarAdvancedButton: React.FC<BottomTabBarButtonProps> = ({
  children,
  onPress,
}) => (
  <Pressable onPress={onPress} style={styles.container}>
    <LinearGradient
      colors={["#6366F1", "#818CF8"]}
      style={styles.background}
    >
      <FontAwesome name="plus" size={24} color="#FFFFFF" />
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 75,
    alignItems: "center",
  },
  background: {
  
    top: -22,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default TabBarAdvancedButton;

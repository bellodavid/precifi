import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";

export default function VaultHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🔐 Vault</Text>
          <Text style={styles.subtitle}>Secure your financial future</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: 18,
  },
});

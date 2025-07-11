import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const Summary = () => {
  return (
    <LinearGradient
      colors={["#6366F1", "#8B5CF6", "#EC4899"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Total Balance</Text>
        <Text style={styles.balance}>$1,234.56</Text>
        <Text style={styles.subtitle}>Available to spend</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <FontAwesome name="arrow-up" size={16} color="#10B981" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statValue}>+$5,000.00</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <FontAwesome name="arrow-down" size={16} color="#EF4444" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statValue}>-$3,765.44</Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 2,
    marginBottom: 24,
  },
  content: {
    backgroundColor: "rgba(31, 41, 55, 0.9)",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#E5E7EB",
    fontWeight: "500",
    marginBottom: 8,
  },
  balance: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 8,
  },
});

export default Summary;

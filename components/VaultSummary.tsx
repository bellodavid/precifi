import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/Themed";

export default function VaultSummary() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Total Locked</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        </View>

        <Text style={styles.amount}>$0.00</Text>

        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleLabel}>Next Release</Text>
            <Text style={styles.scheduleValue}>$0.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleLabel}>Frequency</Text>
            <Text style={styles.scheduleValue}>Weekly</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "0%" }]} />
          </View>
          <Text style={styles.progressText}>0% released</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  statusBadge: {
    backgroundColor: "rgba(52, 211, 153, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(52, 211, 153, 0.3)",
  },
  statusText: {
    color: "#34D399",
    fontSize: 12,
    fontWeight: "600",
  },
  amount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 24,
    textAlign: "center",
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  scheduleItem: {
    flex: 1,
    alignItems: "center",
  },
  scheduleLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 4,
  },
  scheduleValue: {
    fontSize: 16,
    color: "#F9FAFB",
    fontWeight: "600",
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    marginHorizontal: 16,
  },
  progressContainer: {
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6366F1",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});

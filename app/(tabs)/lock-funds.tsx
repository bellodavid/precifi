import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, TextInput } from "../../components/ui";

export default function LockFundsScreen() {
  const [lockAmount, setLockAmount] = useState("");
  const [releaseAmount, setReleaseAmount] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const insets = useSafeAreaInsets();

  const frequencies = [
    { label: "Daily", value: "daily", icon: "📅" },
    { label: "Weekly", value: "weekly", icon: "📊" },
    { label: "Monthly", value: "monthly", icon: "🗓️" },
  ];

  const handleLockFunds = () => {
    if (!lockAmount || parseFloat(lockAmount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount to lock");
      return;
    }

    if (!releaseAmount || parseFloat(releaseAmount) <= 0) {
      Alert.alert("Error", "Please enter a valid release amount");
      return;
    }

    if (parseFloat(releaseAmount) > parseFloat(lockAmount)) {
      Alert.alert("Error", "Release amount cannot be greater than lock amount");
      return;
    }

    const totalReleaseTime = Math.ceil(
      parseFloat(lockAmount) / parseFloat(releaseAmount)
    );
    const timeUnit =
      frequency === "daily"
        ? "days"
        : frequency === "weekly"
        ? "weeks"
        : "months";

    Alert.alert(
      "Lock Funds Configuration",
      `Lock Amount: $${lockAmount}\nRelease: $${releaseAmount} ${frequency}\nTotal Release Time: ~${totalReleaseTime} ${timeUnit}\n\nOnce locked, you can only access the configured release amount. Continue?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Lock Funds",
          onPress: () => console.log("Funds locked with release config"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.subtitle}>
            Configure fund locking with automatic release to your main wallet
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>Amount to Lock</Text>
            <TextInput
              placeholder="Enter amount to lock (e.g., 1000)"
              keyboardType="numeric"
              value={lockAmount}
              onChangeText={setLockAmount}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Release Amount</Text>
            <TextInput
              placeholder="Enter release amount (e.g., 100)"
              keyboardType="numeric"
              value={releaseAmount}
              onChangeText={setReleaseAmount}
            />
          </View>

          <View style={styles.frequencySection}>
            <Text style={styles.label}>Release Frequency</Text>
            <View style={styles.frequencyButtons}>
              {frequencies.map((freq) => (
                <TouchableOpacity
                  key={freq.value}
                  style={[
                    styles.frequencyButton,
                    frequency === freq.value && styles.selectedFrequency,
                  ]}
                  onPress={() => setFrequency(freq.value)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.frequencyIcon}>{freq.icon}</Text>
                  <Text
                    style={[
                      styles.frequencyButtonText,
                      frequency === freq.value && styles.selectedFrequencyText,
                    ]}
                  >
                    {freq.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Lock Configuration</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Lock Amount:</Text>
                <Text style={styles.summaryValue}>${lockAmount || "0.00"}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Release Amount:</Text>
                <Text style={styles.summaryValue}>
                  ${releaseAmount || "0.00"}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Release Frequency:</Text>
                <Text style={styles.summaryValue}>{frequency}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Monthly Release:</Text>
                <Text style={styles.summaryHighlight}>
                  $
                  {releaseAmount
                    ? (
                        parseFloat(releaseAmount) *
                        (frequency === "daily"
                          ? 30
                          : frequency === "weekly"
                          ? 4
                          : 1)
                      ).toFixed(2)
                    : "0.00"}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Release Time:</Text>
                <Text style={styles.summaryInfo}>
                  {lockAmount && releaseAmount && parseFloat(releaseAmount) > 0
                    ? `~${Math.ceil(
                        parseFloat(lockAmount) / parseFloat(releaseAmount)
                      )} ${
                        frequency === "daily"
                          ? "days"
                          : frequency === "weekly"
                          ? "weeks"
                          : "months"
                      }`
                    : "N/A"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.noteSection}>
            <Text style={styles.noteTitle}>💡 How it works:</Text>
            <Text style={styles.noteText}>
              • Your locked funds will be secured and inaccessible{"\n"}• Only
              the configured release amount will be sent to your main wallet
              {"\n"}• Releases happen automatically based on your chosen
              frequency{"\n"}• This helps you save while maintaining controlled
              access to funds
            </Text>
          </View>

          <Button
            title="Lock Funds with Release Config"
            onPress={handleLockFunds}
            style={styles.button}
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
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
  formContainer: {
    paddingHorizontal: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 12,
  },
  frequencySection: {
    marginBottom: 24,
  },
  frequencyButtons: {
    flexDirection: "row",
    gap: 12,
  },
  frequencyButton: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1F2937",
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  selectedFrequency: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  frequencyIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  selectedFrequencyText: {
    color: "#FFFFFF",
  },
  summarySection: {
    marginBottom: 32,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 14,
    color: "#F9FAFB",
    fontWeight: "600",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    marginVertical: 12,
  },
  summaryHighlight: {
    fontSize: 16,
    color: "#6366F1",
    fontWeight: "bold",
  },
  summaryInfo: {
    fontSize: 14,
    color: "#F59E0B",
    fontWeight: "600",
  },
  noteSection: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: "#9CA3AF",
    lineHeight: 20,
  },
  button: {
    borderRadius: 16,
  },
});

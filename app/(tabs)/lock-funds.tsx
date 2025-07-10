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
import { Button, TextInput } from "@/src/components/ui";

export default function LockFundsScreen() {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const insets = useSafeAreaInsets();

  const frequencies = [
    { label: "Daily", value: "daily", icon: "📅" },
    { label: "Weekly", value: "weekly", icon: "📊" },
    { label: "Monthly", value: "monthly", icon: "🗓️" },
  ];

  const handleLockFunds = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    Alert.alert(
      "Lock Funds",
      `Are you sure you want to lock $${amount} ${frequency}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Lock", onPress: () => console.log("Funds locked") },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ScrollView
        style={[styles.scrollContainer, { paddingTop: insets.top }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🔒 Lock Funds</Text>
          <Text style={styles.subtitle}>
            Set up automated fund locking to build your savings
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>Amount to Lock</Text>
            <TextInput
              placeholder="Enter amount (e.g., 100)"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              style={styles.input}
            />
          </View>

          <View style={styles.frequencySection}>
            <Text style={styles.label}>Lock Frequency</Text>
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
            <Text style={styles.summaryTitle}>Summary</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Amount:</Text>
                <Text style={styles.summaryValue}>${amount || "0.00"}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Frequency:</Text>
                <Text style={styles.summaryValue}>{frequency}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total per month:</Text>
                <Text style={styles.summaryHighlight}>
                  $
                  {amount
                    ? (
                        parseFloat(amount) *
                        (frequency === "daily"
                          ? 30
                          : frequency === "weekly"
                          ? 4
                          : 1)
                      ).toFixed(2)
                    : "0.00"}
                </Text>
              </View>
            </View>
          </View>

          <Button
            title="Lock Funds"
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
  input: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#F9FAFB",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
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
  button: {
    borderRadius: 16,
  },
});

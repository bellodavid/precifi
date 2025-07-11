import React from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import VaultSummary from "@/components/VaultSummary";
import { Button } from "@/components/ui";
import { Link } from "expo-router";
import VaultHeader from "@/components/VaultHeader";
import ReleaseHistory from "@/components/ReleaseHistory";

export default function VaultScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ScrollView
        style={[styles.scrollContainer, { paddingTop: insets.top }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <VaultHeader />
        <VaultSummary />
        <View style={styles.buttonContainer}>
          <Link href="/(tabs)/lock-funds" asChild>
            <Button
              title="Lock New Funds"
              variant="primary"
              style={styles.lockButton}
              onPress={() => {}}
            />
          </Link>
        </View>
        <ReleaseHistory />
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
    paddingBottom: 100, // Space for tab bar
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginVertical: 24,
  },
  lockButton: {
    borderRadius: 16,
  },
});

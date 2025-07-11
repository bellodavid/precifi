import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Summary from "@/components/Summary";
import RecentTransactions from "@/components/RecentTransactions";

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      {/* Fixed Welcome Header */}
      <View style={[styles.welcomeHeader, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>David</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Summary />
        <RecentTransactions />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827", // Dark background
  },
  scrollContainer: {
    flex: 1,
  },
  welcomeHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#111827",
  },
  welcomeText: {
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F9FAFB",
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 100, // Space for tab bar
  },
});

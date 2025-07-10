import { StyleSheet, ScrollView, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Summary from "@/components/Summary";
import RecentTransactions from "@/components/RecentTransactions";

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ScrollView
        style={[styles.scrollContainer, { paddingTop: insets.top }]}
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
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // Space for tab bar
  },
});

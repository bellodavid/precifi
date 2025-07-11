import { StyleSheet, View, StatusBar, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BudgetList from "@/components/BudgetList";

export default function BudgetsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <BudgetList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#111827",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F9FAFB",
  },
});

import { StyleSheet, View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TransactionList from "@/components/TransactionList";

export default function TransactionsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <TransactionList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  content: {
    flex: 1,
  },
});

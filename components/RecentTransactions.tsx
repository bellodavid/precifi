import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    description: "Groceries",
    amount: -50.25,
    date: "2025-07-10",
    category: "🛒",
  },
  {
    id: "2",
    description: "Paycheck",
    amount: 2000,
    date: "2025-07-09",
    category: "💰",
  },
  {
    id: "3",
    description: "Rent",
    amount: -1200,
    date: "2025-07-08",
    category: "🏠",
  },
  {
    id: "4",
    description: "Gas",
    amount: -35.7,
    date: "2025-07-07",
    category: "⛽",
  },
  {
    id: "5",
    description: "Dinner",
    amount: -60,
    date: "2025-07-06",
    category: "🍽️",
  },
];

const RecentTransactions = () => {
  const renderItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.transactionItem} activeOpacity={0.7}>
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.categoryIcon}>{item.category}</Text>
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text
          style={[
            styles.amount,
            item.amount > 0 ? styles.income : styles.expense,
          ]}
        >
          {item.amount > 0 ? "+" : ""}${Math.abs(item.amount).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F2937",
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F9FAFB",
  },
  seeAll: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "600",
  },
  listContainer: {
    backgroundColor: "rgba(55, 65, 81, 0.5)",
    borderRadius: 16,
    overflow: "hidden",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(75, 85, 99, 0.3)",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  rightContent: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  income: {
    color: "#34D399",
  },
  expense: {
    color: "#F87171",
  },
});

export default RecentTransactions;

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  {
    id: "6",
    description: "Freelance",
    amount: 500,
    date: "2025-07-05",
    category: "💼",
  },
  {
    id: "7",
    description: "Movie Tickets",
    amount: -25,
    date: "2025-07-04",
    category: "🎬",
  },
  {
    id: "8",
    description: "Coffee",
    amount: -5.5,
    date: "2025-07-03",
    category: "☕",
  },
  {
    id: "9",
    description: "Gym Membership",
    amount: -40,
    date: "2025-07-02",
    category: "🏋️",
  },
  {
    id: "10",
    description: "Birthday Gift",
    amount: -75,
    date: "2025-07-01",
    category: "🎁",
  },
];

const TransactionList = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const insets = useSafeAreaInsets();

  const filters = ["All", "Income", "Expenses"];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Income" && transaction.amount > 0) ||
      (selectedFilter === "Expenses" && transaction.amount < 0);
    return matchesSearch && matchesFilter;
  });

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
              year: "numeric",
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
        <View
          style={[
            styles.typeBadge,
            item.amount > 0 ? styles.incomeBadge : styles.expenseBadge,
          ]}
        >
          <Text
            style={[
              styles.typeText,
              item.amount > 0 ? styles.incomeText : styles.expenseText,
            ]}
          >
            {item.amount > 0 ? "Income" : "Expense"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>Track your financial activity</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor="#6B7280"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilter,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredTransactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <Link href="/add-transaction" asChild>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#F9FAFB",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  selectedFilter: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  filterText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  selectedFilterText: {
    color: "#FFFFFF",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#1F2937",
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  listContent: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(75, 85, 99, 0.2)",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 22,
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 4,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  income: {
    color: "#34D399",
  },
  expense: {
    color: "#F87171",
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  incomeBadge: {
    backgroundColor: "rgba(52, 211, 153, 0.1)",
  },
  expenseBadge: {
    backgroundColor: "rgba(248, 113, 113, 0.1)",
  },
  typeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  incomeText: {
    color: "#34D399",
  },
  expenseText: {
    color: "#F87171",
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default TransactionList;

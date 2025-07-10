import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  icon: string;
  color: string;
}

const budgets: Budget[] = [
  {
    id: "1",
    category: "Groceries",
    amount: 500,
    spent: 250.75,
    icon: "🛒",
    color: "#10B981",
  },
  {
    id: "2",
    category: "Dining Out",
    amount: 200,
    spent: 150,
    icon: "🍽️",
    color: "#F59E0B",
  },
  {
    id: "3",
    category: "Shopping",
    amount: 300,
    spent: 350,
    icon: "🛍️",
    color: "#EF4444",
  },
  {
    id: "4",
    category: "Transportation",
    amount: 100,
    spent: 75,
    icon: "🚗",
    color: "#8B5CF6",
  },
  {
    id: "5",
    category: "Entertainment",
    amount: 150,
    spent: 89,
    icon: "🎬",
    color: "#06B6D4",
  },
  {
    id: "6",
    category: "Healthcare",
    amount: 200,
    spent: 45,
    icon: "🏥",
    color: "#84CC16",
  },
];

const BudgetList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

  const periods = ["Weekly", "Monthly", "Yearly"];

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const renderBudgetItem = ({ item }: { item: Budget }) => {
    const progressPercentage = Math.min((item.spent / item.amount) * 100, 100);
    const isOverBudget = item.spent > item.amount;

    return (
      <TouchableOpacity style={styles.budgetCard} activeOpacity={0.7}>
        <View style={styles.budgetHeader}>
          <View style={styles.categoryInfo}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${item.color}20` },
              ]}
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
            </View>
            <View style={styles.categoryDetails}>
              <Text style={styles.categoryName}>{item.category}</Text>
              <Text style={styles.budgetAmount}>
                ${item.spent.toFixed(2)} of ${item.amount.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.budgetStatus}>
            <Text
              style={[
                styles.remainingAmount,
                isOverBudget ? styles.overBudget : styles.withinBudget,
              ]}
            >
              {isOverBudget ? "+" : ""}$
              {Math.abs(item.amount - item.spent).toFixed(2)}
            </Text>
            <Text style={styles.statusLabel}>
              {isOverBudget ? "Over budget" : "Remaining"}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: isOverBudget ? "#EF4444" : item.color,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {progressPercentage.toFixed(0)}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Budgets</Text>
        <Text style={styles.subtitle}>Track your spending goals</Text>
      </View>

      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedPeriod,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period && styles.selectedPeriodText,
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Budget Overview</Text>
          <Text style={styles.summaryPeriod}>{selectedPeriod}</Text>
        </View>

        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${totalBudget.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Budget</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${totalSpent.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValue,
                remainingBudget < 0 ? styles.overBudget : styles.withinBudget,
              ]}
            >
              ${Math.abs(remainingBudget).toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>
              {remainingBudget < 0 ? "Over Budget" : "Remaining"}
            </Text>
          </View>
        </View>

        <View style={styles.overallProgress}>
          <View style={styles.overallProgressBar}>
            <View
              style={[
                styles.overallProgressFill,
                {
                  width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%`,
                  backgroundColor: remainingBudget < 0 ? "#EF4444" : "#6366F1",
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.budgetListContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={budgets}
          renderItem={renderBudgetItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addBudgetButton} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>+ Add New Budget</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  periodSelector: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  selectedPeriod: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  periodText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  selectedPeriodText: {
    color: "#FFFFFF",
  },
  summaryCard: {
    backgroundColor: "#1F2937",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F9FAFB",
  },
  summaryPeriod: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "600",
  },
  summaryStats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    marginHorizontal: 16,
  },
  overallProgress: {
    marginTop: 8,
  },
  overallProgressBar: {
    height: 8,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    borderRadius: 4,
  },
  overallProgressFill: {
    height: "100%",
    borderRadius: 4,
  },
  budgetListContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 16,
  },
  budgetCard: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 2,
  },
  budgetAmount: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  budgetStatus: {
    alignItems: "flex-end",
  },
  remainingAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  withinBudget: {
    color: "#34D399",
  },
  overBudget: {
    color: "#EF4444",
  },
  statusLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    borderRadius: 3,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
    minWidth: 32,
    textAlign: "right",
  },
  addButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 100, // Space for tab bar
  },
  addBudgetButton: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderWidth: 2,
    borderColor: "#6366F1",
    borderStyle: "dashed",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "#6366F1",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BudgetList;

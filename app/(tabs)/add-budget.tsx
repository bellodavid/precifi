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

const budgetCategories = [
  { id: "1", name: "Groceries", icon: "🛒", color: "#10B981" },
  { id: "2", name: "Dining Out", icon: "🍽️", color: "#F59E0B" },
  { id: "3", name: "Shopping", icon: "🛍️", color: "#EF4444" },
  { id: "4", name: "Transportation", icon: "🚗", color: "#8B5CF6" },
  { id: "5", name: "Entertainment", icon: "🎬", color: "#06B6D4" },
  { id: "6", name: "Healthcare", icon: "🏥", color: "#84CC16" },
  { id: "7", name: "Utilities", icon: "🏠", color: "#F97316" },
  { id: "8", name: "Savings", icon: "💰", color: "#34D399" },
  { id: "9", name: "Education", icon: "📚", color: "#6366F1" },
  { id: "10", name: "Travel", icon: "✈️", color: "#EC4899" },
  { id: "11", name: "Fitness", icon: "💪", color: "#14B8A6" },
  { id: "12", name: "Personal Care", icon: "💄", color: "#F472B6" },
];

const budgetPeriods = [
  { label: "Weekly", value: "weekly", icon: "📅" },
  { label: "Monthly", value: "monthly", icon: "🗓️" },
  { label: "Yearly", value: "yearly", icon: "📊" },
];

export default function AddBudgetScreen() {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetPeriod, setBudgetPeriod] = useState("monthly");
  const [description, setDescription] = useState("");
  const insets = useSafeAreaInsets();

  const handleCreateBudget = () => {
    if (!budgetName.trim()) {
      Alert.alert("Error", "Please enter a budget name");
      return;
    }

    if (!budgetAmount || parseFloat(budgetAmount) <= 0) {
      Alert.alert("Error", "Please enter a valid budget amount");
      return;
    }

    if (!selectedCategory) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    const budgetData = {
      name: budgetName,
      amount: parseFloat(budgetAmount),
      category: selectedCategory,
      period: budgetPeriod,
      description: description || "",
      createdAt: new Date().toISOString(),
      spent: 0,
    };

    Alert.alert(
      "Budget Created",
      `Budget "${budgetName}" created successfully!\n\nAmount: $${budgetAmount} ${budgetPeriod}\nCategory: ${
        budgetCategories.find((c) => c.id === selectedCategory)?.name
      }`,
      [
        {
          text: "OK",
          onPress: () => {
            // Reset form
            setBudgetName("");
            setBudgetAmount("");
            setSelectedCategory("");
            setBudgetPeriod("monthly");
            setDescription("");
          },
        },
      ]
    );

    console.log("Budget created:", budgetData);
  };

  const selectedCategoryData = budgetCategories.find(
    (c) => c.id === selectedCategory
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>💰 Create New Budget</Text>
          <Text style={styles.subtitle}>
            Set spending limits to track your financial goals
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>Budget Name</Text>
            <TextInput
              placeholder="Enter budget name (e.g., Monthly Groceries)"
              value={budgetName}
              onChangeText={setBudgetName}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Budget Amount</Text>
            <TextInput
              placeholder="Enter amount (e.g., 500)"
              keyboardType="numeric"
              value={budgetAmount}
              onChangeText={setBudgetAmount}
            />
          </View>

          <View style={styles.periodSection}>
            <Text style={styles.label}>Budget Period</Text>
            <View style={styles.periodButtons}>
              {budgetPeriods.map((period) => (
                <TouchableOpacity
                  key={period.value}
                  style={[
                    styles.periodButton,
                    budgetPeriod === period.value && styles.selectedPeriod,
                  ]}
                  onPress={() => setBudgetPeriod(period.value)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.periodIcon}>{period.icon}</Text>
                  <Text
                    style={[
                      styles.periodButtonText,
                      budgetPeriod === period.value &&
                        styles.selectedPeriodText,
                    ]}
                  >
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.categorySection}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {budgetCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.selectedCategory,
                    selectedCategory === category.id && {
                      borderColor: category.color,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryName,
                      selectedCategory === category.id &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              placeholder="Add notes about this budget..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Budget Summary</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Budget Name:</Text>
                <Text style={styles.summaryValue}>{budgetName || "N/A"}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Amount:</Text>
                <Text style={styles.summaryValue}>
                  ${budgetAmount || "0.00"}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Period:</Text>
                <Text style={styles.summaryValue}>{budgetPeriod}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Category:</Text>
                <Text style={styles.summaryValue}>
                  {selectedCategoryData
                    ? `${selectedCategoryData.icon} ${selectedCategoryData.name}`
                    : "N/A"}
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Daily Allowance:</Text>
                <Text style={styles.summaryHighlight}>
                  $
                  {budgetAmount
                    ? (
                        parseFloat(budgetAmount) /
                        (budgetPeriod === "weekly"
                          ? 7
                          : budgetPeriod === "monthly"
                          ? 30
                          : 365)
                      ).toFixed(2)
                    : "0.00"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.noteSection}>
            <Text style={styles.noteTitle}>💡 Budget Tips:</Text>
            <Text style={styles.noteText}>
              • Set realistic amounts based on your spending history{"\n"}• Use
              the 50/30/20 rule: 50% needs, 30% wants, 20% savings{"\n"}• Review
              and adjust your budgets monthly{"\n"}• Track your progress
              regularly to stay on target
            </Text>
          </View>

          <Button
            title="Create Budget"
            onPress={handleCreateBudget}
            style={styles.createButton}
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
  periodSection: {
    marginBottom: 24,
  },
  periodButtons: {
    flexDirection: "row",
    gap: 12,
  },
  periodButton: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1F2937",
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  selectedPeriod: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  periodIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  selectedPeriodText: {
    color: "#FFFFFF",
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryButton: {
    width: "47%",
    backgroundColor: "#1F2937",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  selectedCategory: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderWidth: 2,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    textAlign: "center",
  },
  selectedCategoryText: {
    color: "#6366F1",
  },
  summarySection: {
    marginBottom: 24,
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
    color: "#10B981",
    fontWeight: "bold",
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
  createButton: {
    borderRadius: 16,
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  Alert,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../components/ui";

const categories = [
  { id: "1", name: "Groceries", icon: "🛒", color: "#10B981" },
  { id: "2", name: "Dining Out", icon: "🍽️", color: "#F59E0B" },
  { id: "3", name: "Shopping", icon: "🛍️", color: "#EF4444" },
  { id: "4", name: "Transportation", icon: "🚗", color: "#8B5CF6" },
  { id: "5", name: "Entertainment", icon: "🎬", color: "#06B6D4" },
  { id: "6", name: "Healthcare", icon: "🏥", color: "#84CC16" },
  { id: "7", name: "Utilities", icon: "🏠", color: "#F97316" },
  { id: "8", name: "Income", icon: "💰", color: "#34D399" },
];

export default function AddTransactionScreen() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );
  const insets = useSafeAreaInsets();

  const handleAddTransaction = () => {
    if (!description || !amount || !selectedCategory) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const transactionData = {
      description,
      amount: parseFloat(amount),
      category: selectedCategory,
      type: transactionType,
      date: new Date().toISOString(),
    };

    console.log("Transaction added:", transactionData);
    Alert.alert("Success", "Transaction added successfully!");

    // Reset form
    setDescription("");
    setAmount("");
    setSelectedCategory("");
    setTransactionType("expense");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ScrollView
    
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Transaction</Text>
          <Text style={styles.subtitle}>Record your income and expenses</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === "expense" && styles.selectedExpenseType,
              ]}
              onPress={() => setTransactionType("expense")}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  transactionType === "expense" && styles.selectedExpenseText,
                ]}
              >
                💸 Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === "income" && styles.selectedIncomeType,
              ]}
              onPress={() => setTransactionType("income")}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  transactionType === "income" && styles.selectedIncomeText,
                ]}
              >
                💰 Income
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Lunch at cafe"
              placeholderTextColor="#6B7280"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#6B7280"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.categorySection}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.name &&
                      styles.selectedCategory,
                    { borderColor: category.color },
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryName,
                      selectedCategory === category.name &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            title="Transaction"
            onPress={handleAddTransaction}
            style={styles.addButton}
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
  typeSelector: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
    alignItems: "center",
  },
  selectedExpenseType: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },
  selectedIncomeType: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  selectedExpenseText: {
    color: "#FFFFFF",
  },
  selectedIncomeText: {
    color: "#FFFFFF",
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 8,
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
  categorySection: {
    marginBottom: 32,
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
  },
  selectedCategory: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
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
  addButton: {
    borderRadius: 16,
    marginTop: 8,
  },
});

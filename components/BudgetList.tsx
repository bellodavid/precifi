import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const budgets = [
  { id: '1', category: 'Groceries', amount: 500, spent: 250.75 },
  { id: '2', category: 'Dining Out', amount: 200, spent: 150 },
  { id: '3', category: 'Shopping', amount: 300, spent: 350 },
  { id: '4', category: 'Transportation', amount: 100, spent: 75 },
];

const BudgetList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.budgetItem}>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.amount}>{`$${item.spent.toFixed(2)} / $${item.amount.toFixed(2)}`}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${(item.spent / item.amount) * 100}%` }]} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={budgets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  budgetItem: {
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  progress: {
    height: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
});

export default BudgetList;

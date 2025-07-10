import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const transactions = [
  { id: '1', description: 'Groceries', amount: -50.25, date: '2025-07-10' },
  { id: '2', description: 'Paycheck', amount: 2000, date: '2025-07-09' },
  { id: '3', description: 'Rent', amount: -1200, date: '2025-07-08' },
  { id: '4', description: 'Gas', amount: -35.70, date: '2025-07-07' },
  { id: '5', description: 'Dinner', amount: -60, date: '2025-07-06' },
];

const RecentTransactions = () => {
  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={[styles.amount, item.amount > 0 ? styles.income : styles.expense]}>
        {item.amount > 0 ? `+$${item.amount.toFixed(2)}` : `-$${Math.abs(item.amount).toFixed(2)}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  description: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
});

export default RecentTransactions;

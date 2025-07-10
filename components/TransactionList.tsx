import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const transactions = [
  { id: '1', description: 'Groceries', amount: -50.25, date: '2025-07-10' },
  { id: '2', description: 'Paycheck', amount: 2000, date: '2025-07-09' },
  { id: '3', description: 'Rent', amount: -1200, date: '2025-07-08' },
  { id: '4', description: 'Gas', amount: -35.70, date: '2025-07-07' },
  { id: '5', description: 'Dinner', amount: -60, date: '2025-07-06' },
  { id: '6', description: 'Freelance', amount: 500, date: '2025-07-05' },
  { id: '7', description: 'Movie Tickets', amount: -25, date: '2025-07-04' },
  { id: '8', description: 'Coffee', amount: -5.50, date: '2025-07-03' },
  { id: '9', description: 'Gym Membership', amount: -40, date: '2025-07-02' },
  { id: '10', description: 'Birthday Gift', amount: -75, date: '2025-07-01' },
];

const TransactionList = () => {
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
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Link href="/add-transaction" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
  },
});

export default TransactionList;

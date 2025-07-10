import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Summary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Balance</Text>
      <Text style={styles.balance}>$1,234.56</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Income</Text>
          <Text style={styles.detailAmount}>$5,000.00</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Expenses</Text>
          <Text style={styles.detailAmount}>$3,765.44</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 16,
    color: '#888',
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 14,
    color: '#888',
  },
  detailAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Summary;

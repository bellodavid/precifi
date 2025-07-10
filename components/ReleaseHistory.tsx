
import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from '@/components/Themed';

const DATA = [
  {
    id: '1',
    date: '2025-07-10',
    amount: '$50.00',
  },
  {
    id: '2',
    date: '2025-07-03',
    amount: '$50.00',
  },
  {
    id: '3',
    date: '2025-06-26',
    amount: '$50.00',
  },
];

const Item = ({ date, amount }: { date: string, amount: string }) => (
  <View style={styles.item}>
    <Text>{date}</Text>
    <Text>{amount}</Text>
  </View>
);

export default function ReleaseHistory() {
  const renderItem = ({ item }: any) => (
    <Item date={item.date} amount={item.amount} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Release History</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

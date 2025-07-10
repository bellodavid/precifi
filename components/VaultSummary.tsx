
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';

export default function VaultSummary() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Total Locked</Text>
      <Text style={styles.title}>$0.00</Text>
      <Text style={styles.default}>Release Schedule: $0.00 weekly</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  default: {
    fontSize: 14,
    color: '#888',
  },
});

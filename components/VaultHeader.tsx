
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';

export default function VaultHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vault</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

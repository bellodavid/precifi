
import React from 'react';
import { StyleSheet, View } from 'react-native';
import VaultSummary from '@/components/VaultSummary';
import { Button } from '@/src/components/ui';
import { Link } from 'expo-router';
import VaultHeader from '@/components/VaultHeader';
import ReleaseHistory from '@/components/ReleaseHistory';

export default function VaultScreen() {
  return (
    <View style={styles.container}>
      <VaultHeader />
      <VaultSummary />
      <Link href="/(tabs)/lock-funds" asChild>
        <Button title="Lock New Funds" />
      </Link>
      <ReleaseHistory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

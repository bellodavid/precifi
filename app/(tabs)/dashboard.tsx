import { StyleSheet, ScrollView } from 'react-native';

import Summary from '@/components/Summary';
import RecentTransactions from '@/components/RecentTransactions';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Summary />
      <RecentTransactions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

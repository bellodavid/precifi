import { StyleSheet, TextInput, Button } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function AddTransactionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>
      <TextInput style={styles.input} placeholder="Description" />
      <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Date" />
      <Button title="Add" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

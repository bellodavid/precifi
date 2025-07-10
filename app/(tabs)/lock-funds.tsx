
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { Text as ThemedText } from '@/components/Themed';
import { Button, TextInput } from '@/src/components/ui';

export default function LockFundsScreen() {
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('weekly');

  const frequencies = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  const handleLockFunds = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    
    Alert.alert(
      'Lock Funds',
      `Are you sure you want to lock $${amount} ${frequency}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Lock', onPress: () => console.log('Funds locked') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Lock Funds</ThemedText>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
      </View>

      <View style={styles.frequencyContainer}>
        <ThemedText style={styles.label}>Frequency:</ThemedText>
        <View style={styles.frequencyButtons}>
          {frequencies.map((freq) => (
            <TouchableOpacity
              key={freq.value}
              style={[
                styles.frequencyButton,
                frequency === freq.value && styles.selectedFrequency
              ]}
              onPress={() => setFrequency(freq.value)}
            >
              <Text style={[
                styles.frequencyButtonText,
                frequency === freq.value && styles.selectedFrequencyText
              ]}>
                {freq.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Button 
        title="Lock Funds" 
        onPress={handleLockFunds}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  frequencyContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  frequencyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  frequencyButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedFrequency: {
    backgroundColor: '#007BFF',
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedFrequencyText: {
    color: '#fff',
  },
  button: {
    marginTop: 20,
  },
});


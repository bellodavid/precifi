import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { 
  Button, 
  Container, 
  TextInput, 
  Logo 
} from '../../src/components/ui';
import theme from '../../src/theme';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    
    return true;
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) return;
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // This would be implemented with actual API call
        console.log(`Reset password with token: ${token}`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSuccess(true);
      } catch (error) {
        console.error('Reset password error:', error);
        setError('Failed to reset password. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <Container scrollable keyboardAvoiding>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color={theme.colors.dark.text.primary} 
        />
      </TouchableOpacity>
      
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Logo size="large" />
          <Text style={styles.headerText}>Reset Password</Text>
          <Text style={styles.subHeaderText}>
            {isSuccess 
              ? "Your password has been reset successfully"
              : "Create a new password for your account"
            }
          </Text>
        </View>

        {!isSuccess ? (
          <View style={styles.formContainer}>
            <TextInput
              label="New Password"
              placeholder="Enter your new password"
              isPassword
              value={password}
              onChangeText={setPassword}
              leftIcon={
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color={theme.colors.dark.text.tertiary} 
                />
              }
            />
            
            <TextInput
              label="Confirm Password"
              placeholder="Confirm your new password"
              isPassword
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              leftIcon={
                <Ionicons 
                  name="shield-checkmark-outline" 
                  size={20} 
                  color={theme.colors.dark.text.tertiary} 
                />
              }
              error={error}
            />
            
            <Button
              title="Reset Password"
              onPress={handleResetPassword}
              loading={isLoading}
              disabled={!password || !confirmPassword}
              style={styles.resetButton}
            />
          </View>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <Ionicons 
                name="checkmark-circle" 
                size={80} 
                color={theme.colors.success} 
              />
            </View>
            
            <Text style={styles.successText}>
              Your password has been reset successfully
            </Text>
            
            <Button
              title="Back to Login"
              onPress={handleBackToLogin}
              style={styles.backToLoginButton}
            />
          </View>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.xl,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginLeft: -theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  headerText: {
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.dark.text.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  subHeaderText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.dark.text.secondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  formContainer: {
    marginBottom: theme.spacing.xl,
  },
  resetButton: {
    marginTop: theme.spacing.lg,
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
  },
  successIconContainer: {
    marginBottom: theme.spacing.xl,
  },
  successText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.dark.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  backToLoginButton: {
    marginTop: theme.spacing.xl,
    width: '100%',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { 
  Button, 
  Container, 
  TextInput, 
  Divider, 
  SocialButton, 
  Logo 
} from '../../components/ui';
import theme from '../../theme';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [socialLoading, setSocialLoading] = useState<string | undefined>(undefined);

  const validateForm = () => {
    clearError();
    setPasswordError('');
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) return;
    
    if (validateForm()) {
      await register(name, email, password);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'facebook') => {
    try {
      setSocialLoading(provider);
      // This would be implemented with actual social auth
      console.log(`Sign up with ${provider}`);
      // Simulate delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`${provider} signup error:`, error);
    } finally {
      setSocialLoading(undefined);
    }
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
          <Text style={styles.headerText}>Create Account</Text>
          <Text style={styles.subHeaderText}>
            Sign up to start your financial journey
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            leftIcon={
              <Ionicons 
                name="person-outline" 
                size={20} 
                color={theme.colors.dark.text.tertiary} 
              />
            }
          />
          
          <TextInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            leftIcon={
              <Ionicons 
                name="mail-outline" 
                size={20} 
                color={theme.colors.dark.text.tertiary} 
              />
            }
          />
          
          <TextInput
            label="Password"
            placeholder="Create a password"
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
            error={passwordError}
          />
          
          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
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
            error={error || undefined}
          />
          
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={isLoading}
            disabled={!name || !email || !password || !confirmPassword}
            style={styles.registerButton}
          />
        </View>
        
        <Divider text="Or sign up with" />
        
        <View style={styles.socialContainer}>
          <SocialButton
            provider="google"
            onPress={() => handleSocialSignup('google')}
            loading={socialLoading === 'google'}
            style={styles.socialButton}
          />
          
          <SocialButton
            provider="facebook"
            onPress={() => handleSocialSignup('facebook')}
            loading={socialLoading === 'facebook'}
            style={styles.socialButton}
          />
        </View>
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Link href="/login" asChild>
            <Button
              title="Log In"
              variant="text"
              style={styles.loginButton}
              onPress={() => {}}
            />
          </Link>
        </View>
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
  },
  formContainer: {
    marginBottom: theme.spacing.xl,
  },
  registerButton: {
    marginTop: theme.spacing.md,
  },
  socialContainer: {
    marginBottom: theme.spacing.xl,
  },
  socialButton: {
    marginBottom: theme.spacing.sm,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  },
  loginText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.dark.text.secondary,
  },
  loginButton: {
    marginLeft: theme.spacing.xs,
  },
});

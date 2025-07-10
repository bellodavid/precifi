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
} from '../../src/components/ui';
import theme from '../../src/theme';
import { useAuth } from '../../src/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [socialLoading, setSocialLoading] = useState<string | undefined>(undefined);

  const handleLogin = async () => {
    if (!email || !password) return;
    await login({ email, password });
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setSocialLoading(provider);
      // This would be implemented with actual social auth
      console.log(`Login with ${provider}`);
      // Simulate delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`${provider} login error:`, error);
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
          <Text style={styles.headerText}>Welcome back</Text>
          <Text style={styles.subHeaderText}>
            Log in to continue managing your finances
          </Text>
        </View>

        <View style={styles.formContainer}>
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
            placeholder="Enter your password"
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
            error={error || undefined}
          />
          
          <Link href="/forgot-password" asChild>
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </Link>
          
          <Button
            title="Log In"
            onPress={handleLogin}
            loading={isLoading}
            disabled={!email || !password}
            style={styles.loginButton}
          />
        </View>
        
        <Divider text="Or continue with" />
        
        <View style={styles.socialContainer}>
          <SocialButton
            provider="google"
            onPress={() => handleSocialLogin('google')}
            loading={socialLoading === 'google'}
            style={styles.socialButton}
          />
          
          <SocialButton
            provider="facebook"
            onPress={() => handleSocialLogin('facebook')}
            loading={socialLoading === 'facebook'}
            style={styles.socialButton}
          />
        </View>
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Link href="/register" asChild>
            <Button
              title="Sign Up"
              variant="text"
              style={styles.signupButton}
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  forgotPasswordText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.primary,
  },
  loginButton: {
    marginTop: theme.spacing.md,
  },
  socialContainer: {
    marginBottom: theme.spacing.xl,
  },
  socialButton: {
    marginBottom: theme.spacing.sm,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  },
  signupText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.dark.text.secondary,
  },
  signupButton: {
    marginLeft: theme.spacing.xs,
  },
});

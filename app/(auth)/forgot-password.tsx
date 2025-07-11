import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button, Container, TextInput, Logo } from "../../components/ui";
import theme from "../../theme";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = async () => {
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      // This would be implemented with actual API call
      console.log(`Reset password for email: ${email}`);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <Container scrollable keyboardAvoiding>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
            {isSubmitted
              ? "We've sent you an email with instructions to reset your password"
              : "Enter your email and we'll send you instructions to reset your password"}
          </Text>
        </View>

        {!isSubmitted ? (
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
              error={error}
            />

            <Button
              title="Send Reset Instructions"
              onPress={handleResetPassword}
              loading={isLoading}
              disabled={!email}
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
              Check your inbox for the reset link
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
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  headerText: {
    fontSize: theme.typography.fontSize["2xl"],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.dark.text.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  subHeaderText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.dark.text.secondary,
    textAlign: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  formContainer: {
    marginBottom: theme.spacing.xl,
  },
  resetButton: {
    marginTop: theme.spacing.lg,
  },
  successContainer: {
    alignItems: "center",
    paddingTop: theme.spacing.xl,
  },
  successIconContainer: {
    marginBottom: theme.spacing.xl,
  },
  successText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.dark.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  backToLoginButton: {
    marginTop: theme.spacing.xl,
    width: "100%",
  },
});

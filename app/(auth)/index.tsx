import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button, Container, Logo } from "../../components/ui";
import theme from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Container scrollable keyboardAvoiding>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo size="large" />
          <Text style={styles.tagline}>Your AI-powered money partner</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons
              name="finance"
              size={120}
              color={theme.colors.primary}
            />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            Smart budgeting for your financial goals
          </Text>
          <Text style={styles.description}>
            Precifi helps you save money and reach your financial goals with
            AI-powered guidance tailored to African realities.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => router.push("/register")}
            style={styles.button}
          />
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
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: theme.spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  tagline: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.dark.text.secondary,
    marginTop: theme.spacing.xs,
    fontFamily: theme.typography.fontFamily.medium,
  },
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: theme.spacing.xl,
  },
  iconBackground: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize["2xl"],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.dark.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.dark.text.secondary,
    textAlign: "center",
    lineHeight: theme.typography.fontSize.md * 1.5,
  },
  buttonContainer: {
    marginTop: theme.spacing.xl,
  },
  button: {
    marginBottom: theme.spacing.lg,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

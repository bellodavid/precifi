import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../hooks/useAuth";
import theme from "../theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// This component handles the authentication flow and redirects
function AuthWrapper() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && inAuthGroup) {
      // Redirect to the main app if authenticated but in auth screens
      router.replace("/(tabs)/dashboard");
    } else if (!isAuthenticated && !inAuthGroup) {
      // Redirect to auth screens if not authenticated and trying to access protected routes
      router.replace("/(auth)");
    }
  }, [isAuthenticated, segments, isLoading]);

  // While loading, show nothing
  if (isLoading) {
    return <Slot />;
  }

  // Return the children as-is
  return <Slot />;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  // Always use dark theme as specified in requirements
  const colorScheme = "dark";

  return (
    <ThemeProvider value={DarkTheme}>
      <AuthWrapper />
    </ThemeProvider>
  );
}

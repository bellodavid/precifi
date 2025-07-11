import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6366F1", // Modern indigo color
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: "#1F2937", // Dark background
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 4,
          height: Platform.OS === "ios" ? 88 : 60,
          paddingBottom:
            Platform.OS === "ios" ? Math.max(insets.bottom, 24) : 0,
          paddingTop: Platform.OS === "ios" ? 8 : 8,
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: Platform.OS === "ios" ? 0 : 2,
          marginTop: Platform.OS === "ios" ? 0 : 2,
        },
        tabBarIconStyle: {
          marginBottom: Platform.OS === "ios" ? 2 : 0,
        },
        headerStyle: {
          backgroundColor: "#111827",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: "#F9FAFB",
          fontSize: 20,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="budgets"
        options={{
          title: "Budgets",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="briefcase" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vault"
        options={{
          title: "Vault",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="lock" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />

      {/* Hidden routes - accessible but not shown in tab bar */}
      <Tabs.Screen
        name="lock-funds"
        options={{
          href: null, // This hides the tab but keeps the route accessible
        }}
      />
      <Tabs.Screen
        name="add-transaction"
        options={{
          href: null, // This hides the tab but keeps the route accessible
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          href: null, // This hides the tab but keeps the route accessible
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

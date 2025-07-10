import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Platform } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6366F1", // Modern indigo color
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: "#1F2937", // Dark background
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === "ios" ? 88 : 64,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
          paddingTop: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: Platform.OS === "ios" ? 0 : 4,
        },
        tabBarIconStyle: {
          marginBottom: 4,
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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="exchange" color={color} />
          ),
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
        name="add-transaction"
        options={{
          title: "Add Transaction",
          href: null,
        }}
      />
      <Tabs.Screen
        name="lock-funds"
        options={{
          title: "Lock Funds",
          href: null,
        }}
      />
    </Tabs>
  );
}

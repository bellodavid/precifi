import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SocialButtonProps {
  provider: "google" | "facebook";
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onPress,
  loading = false,
  style,
}) => {
  const getProviderConfig = () => {
    switch (provider) {
      case "google":
        return {
          icon: "logo-google" as const,
          text: "Continue with Google",
          color: "#4285F4",
        };
      case "facebook":
        return {
          icon: "logo-facebook" as const,
          text: "Continue with Facebook",
          color: "#1877F2",
        };
      default:
        return {
          icon: "globe" as const,
          text: "Continue",
          color: "#6366F1",
        };
    }
  };

  const config = getProviderConfig();

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.7}
    >
      <Ionicons
        name={config.icon}
        size={20}
        color={config.color}
        style={styles.icon}
      />
      <Text style={styles.text}>{config.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F2937",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
  },
});

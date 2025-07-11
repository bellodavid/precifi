import React, { useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  containerStyle,
  leftIcon,
  isPassword = false,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[styles.inputContainer, error && styles.inputContainerError]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <RNTextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            style,
          ]}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
    paddingHorizontal: 16,
    minHeight: 48,
  },
  inputContainerError: {
    borderColor: "#EF4444",
  },
  leftIconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#F9FAFB",
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  passwordToggle: {
    padding: 4,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
});

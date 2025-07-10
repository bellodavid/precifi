import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from "react-native";
import theme from "../../theme";

export type ButtonVariant = "primary" | "secondary" | "outline" | "text";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  title,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  // Determine button styles based on variant and theme
  const getButtonStyles = () => {
    if (variant === "primary") {
      return {
        backgroundColor: isDisabled
          ? theme.buttonStyles.primary.disabledBackgroundColor
          : theme.buttonStyles.primary.backgroundColor,
        borderWidth: 0,
      };
    } else if (variant === "secondary") {
      return {
        backgroundColor: isDisabled
          ? theme.buttonStyles.secondary.disabledBackgroundColor
          : theme.buttonStyles.secondary.backgroundColor,
        borderWidth: 0,
      };
    } else if (variant === "outline") {
      const themeMode = theme.isDark ? "dark" : "light";
      return {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: isDisabled
          ? theme.colors.gray[400]
          : theme.buttonStyles.outline[themeMode].borderColor,
      };
    } else if (variant === "text") {
      return {
        backgroundColor: "transparent",
        borderWidth: 0,
      };
    }
    return {};
  };

  // Determine text styles based on variant and theme
  const getTextStyles = () => {
    if (variant === "primary") {
      return {
        color: isDisabled
          ? theme.buttonStyles.primary.disabledTextColor
          : theme.buttonStyles.primary.textColor,
      };
    } else if (variant === "secondary") {
      return {
        color: isDisabled
          ? theme.buttonStyles.secondary.disabledTextColor
          : theme.buttonStyles.secondary.textColor,
      };
    } else if (variant === "outline" || variant === "text") {
      const themeMode = theme.isDark ? "dark" : "light";
      return {
        color: isDisabled
          ? theme.colors.gray[400]
          : theme.buttonStyles[variant][themeMode].textColor,
      };
    }
    return {};
  };

  // Determine size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
          borderRadius: theme.borderRadius.sm,
        };
      case "lg":
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
          borderRadius: theme.borderRadius.lg,
        };
      case "md":
      default:
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.borderRadius.md,
        };
    }
  };

  // Determine font size based on button size
  const getFontSize = () => {
    switch (size) {
      case "sm":
        return theme.typography.fontSize.sm;
      case "lg":
        return theme.typography.fontSize.lg;
      case "md":
      default:
        return theme.typography.fontSize.md;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getSizeStyles(), getButtonStyles(), style]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary" || variant === "secondary"
              ? theme.colors.white
              : theme.colors.primary
          }
        />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              { fontSize: getFontSize() },
              getTextStyles(),
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: theme.typography.fontFamily.medium,
    textAlign: "center",
  },
  leftIcon: {
    marginRight: theme.spacing.xs,
  },
  rightIcon: {
    marginLeft: theme.spacing.xs,
  },
});

export default Button;

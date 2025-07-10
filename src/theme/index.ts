/**
 * Theme configuration
 * 
 * This file contains the theme configuration for the app.
 * It includes colors, typography, spacing, and other design tokens.
 */

export const colors = {
  // Primary colors
  primary: '#6366F1', // Indigo
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  
  // Secondary colors
  secondary: '#10B981', // Emerald
  secondaryDark: '#059669',
  secondaryLight: '#34D399',
  
  // Accent colors
  accent: '#F59E0B', // Amber
  accentDark: '#D97706',
  accentLight: '#FBBF24',
  
  // Neutral colors
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: '#34D399', // Green
  warning: '#FBBF24', // Yellow
  error: '#EF4444',   // Red
  info: '#60A5FA',    // Blue
  
  // Light mode
  light: {
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F3F4F6',
      tertiary: '#E5E7EB',
      card: '#FFFFFF',
      modal: '#FFFFFF',
    },
    
    // Text colors
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF',
    },
    
    // Border colors
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      dark: '#9CA3AF',
    },
    
    // Input colors
    input: {
      background: '#FFFFFF',
      border: '#D1D5DB',
      placeholder: '#9CA3AF',
    },
  },
  
  // Dark mode (primary theme for this app)
  dark: {
    // Background colors
    background: {
      primary: '#111827',     // Gray-900
      secondary: '#1F2937',   // Gray-800
      tertiary: '#374151',    // Gray-700
      card: '#1F2937',        // Gray-800
      modal: '#1F2937',       // Gray-800
    },
    
    // Text colors
    text: {
      primary: '#F9FAFB',     // Gray-50
      secondary: '#E5E7EB',   // Gray-200
      tertiary: '#9CA3AF',    // Gray-400
      inverse: '#111827',     // Gray-900
    },
    
    // Border colors
    border: {
      light: '#374151',       // Gray-700
      medium: '#4B5563',      // Gray-600
      dark: '#6B7280',        // Gray-500
    },
    
    // Input colors
    input: {
      background: '#1F2937',  // Gray-800
      border: '#4B5563',      // Gray-600
      placeholder: '#6B7280', // Gray-500
    },
  },
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System-Medium',
    bold: 'System-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
};

export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
};

// Button styles
export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary,
    textColor: colors.white,
    pressedBackgroundColor: colors.primaryDark,
    disabledBackgroundColor: colors.gray[300],
    disabledTextColor: colors.gray[500],
  },
  secondary: {
    backgroundColor: colors.secondary,
    textColor: colors.white,
    pressedBackgroundColor: colors.secondaryDark,
    disabledBackgroundColor: colors.gray[300],
    disabledTextColor: colors.gray[500],
  },
  outline: {
    light: {
      backgroundColor: 'transparent',
      textColor: colors.primary,
      borderColor: colors.primary,
      pressedBackgroundColor: colors.gray[100],
    },
    dark: {
      backgroundColor: 'transparent',
      textColor: colors.primaryLight,
      borderColor: colors.primaryLight,
      pressedBackgroundColor: colors.dark.background.tertiary,
    },
  },
  text: {
    light: {
      backgroundColor: 'transparent',
      textColor: colors.primary,
      pressedBackgroundColor: colors.gray[100],
    },
    dark: {
      backgroundColor: 'transparent',
      textColor: colors.primaryLight,
      pressedBackgroundColor: colors.dark.background.tertiary,
    },
  },
};

// Input styles
export const inputStyles = {
  light: {
    backgroundColor: colors.white,
    borderColor: colors.gray[300],
    textColor: colors.gray[900],
    placeholderColor: colors.gray[400],
    errorColor: colors.error,
    focusBorderColor: colors.primary,
  },
  dark: {
    backgroundColor: colors.dark.input.background,
    borderColor: colors.dark.input.border,
    textColor: colors.dark.text.primary,
    placeholderColor: colors.dark.input.placeholder,
    errorColor: colors.error,
    focusBorderColor: colors.primaryLight,
  },
};

// Default theme (dark mode)
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  buttonStyles,
  inputStyles,
  isDark: true, // Default to dark mode
};

export default theme;

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import theme from '../../theme';

interface DividerProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<DividerProps> = ({ text, style }) => {
  const themeMode = theme.isDark ? 'dark' : 'light';
  const dividerColor = theme.isDark ? theme.colors.dark.border.light : theme.colors.gray[300];
  const textColor = theme.isDark ? theme.colors.dark.text.tertiary : theme.colors.gray[500];

  if (!text) {
    return (
      <View 
        style={[
          styles.simpleDivider, 
          { backgroundColor: dividerColor },
          style
        ]} 
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, { backgroundColor: dividerColor }]} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      <View style={[styles.line, { backgroundColor: dividerColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
  },
  text: {
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
  },
  simpleDivider: {
    height: 1,
    width: '100%',
    marginVertical: theme.spacing.md,
  },
});

export default Divider;

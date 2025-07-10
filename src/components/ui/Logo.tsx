import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import theme from '../../theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  style,
}) => {
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return theme.typography.fontSize.xl;
      case 'large':
        return theme.typography.fontSize['4xl'];
      case 'medium':
      default:
        return theme.typography.fontSize['2xl'];
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[
        styles.text, 
        { 
          fontSize: getFontSize(),
          color: theme.colors.primary
        }
      ]}>
        Precifi
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.typography.fontFamily.bold,
    letterSpacing: 1,
  },
});

export default Logo;

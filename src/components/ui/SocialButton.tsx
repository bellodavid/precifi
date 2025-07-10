import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
  View,
  ActivityIndicator
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import theme from '../../theme';

export type SocialProvider = 'google' | 'facebook';

interface SocialButtonProps extends TouchableOpacityProps {
  provider: SocialProvider;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  loading = false,
  style,
  ...rest
}) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          icon: 'google',
          color: '#4285F4',
          text: 'Continue with Google'
        };
      case 'facebook':
        return {
          icon: 'facebook',
          color: '#1877F2',
          text: 'Continue with Facebook'
        };
      default:
        return {
          icon: 'question',
          color: theme.colors.gray[500],
          text: 'Continue with Provider'
        };
    }
  };

  const providerConfig = getProviderConfig();
  const themeMode = theme.isDark ? 'dark' : 'light';
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor: theme.isDark ? theme.colors.dark.background.secondary : theme.colors.white,
          borderColor: theme.isDark ? theme.colors.dark.border.light : theme.colors.gray[300],
        },
        style,
      ]}
      disabled={loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={providerConfig.color} />
      ) : (
        <>
          <View style={styles.iconContainer}>
            <FontAwesome name={providerConfig.icon} size={20} color={providerConfig.color} />
          </View>
          <Text 
            style={[
              styles.text,
              { color: theme.isDark ? theme.colors.dark.text.primary : theme.colors.gray[800] }
            ]}
          >
            {providerConfig.text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    marginVertical: theme.spacing.xs,
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.md,
  },
});

export default SocialButton;

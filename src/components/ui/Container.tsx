import React from 'react';
import { 
  View, 
  StyleSheet, 
  ViewStyle, 
  StyleProp, 
  StatusBar, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import theme from '../../theme';

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  safeArea?: boolean;
  padded?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  scrollable = false,
  keyboardAvoiding = false,
  safeArea = true,
  padded = true,
}) => {
  const backgroundColor = theme.isDark 
    ? theme.colors.dark.background.primary 
    : theme.colors.light.background.primary;

  const content = (
    <View 
      style={[
        styles.container,
        padded && styles.padded,
        { backgroundColor },
        style
      ]}
    >
      {children}
    </View>
  );

  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      );
    }
    return content;
  };

  const renderWithKeyboardAvoiding = (children: React.ReactNode) => {
    if (keyboardAvoiding) {
      return (
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {children}
        </KeyboardAvoidingView>
      );
    }
    return children;
  };

  const renderWithSafeArea = (children: React.ReactNode) => {
    if (safeArea) {
      return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
          <StatusBar 
            barStyle={theme.isDark ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundColor}
          />
          {children}
        </SafeAreaView>
      );
    }
    return (
      <>
        <StatusBar 
          barStyle={theme.isDark ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundColor}
        />
        {children}
      </>
    );
  };

  return renderWithSafeArea(
    renderWithKeyboardAvoiding(
      renderContent()
    )
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  padded: {
    padding: theme.spacing.lg,
  },
  scrollContent: {
    flexGrow: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
});

export default Container;

import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  safeArea?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  scrollable = false,
  keyboardAvoiding = false,
  safeArea = true,
}) => {
  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.contentContainer, style]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, style]}>{children}</View>
  );

  if (keyboardAvoiding) {
    const wrappedContent = (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {content}
      </KeyboardAvoidingView>
    );

    return safeArea ? (
      <SafeAreaView style={styles.safeArea}>{wrappedContent}</SafeAreaView>
    ) : (
      wrappedContent
    );
  }

  return safeArea ? (
    <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#111827",
  },
  container: {
    flex: 1,
    backgroundColor: "#111827",
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#111827",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

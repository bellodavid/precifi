import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = React.useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => console.log("Logout"),
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Delete Account"),
        },
      ]
    );
  };

  const ProfileSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  const ProfileItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightComponent,
    iconColor = "#6366F1",
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
    iconColor?: string;
  }) => (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.profileItemLeft}>
        <View
          style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}
        >
          <FontAwesome name={icon as any} size={18} color={iconColor} />
        </View>
        <View style={styles.profileItemText}>
          <Text style={styles.profileItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.profileItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {rightComponent || (
        <FontAwesome name="chevron-right" size={14} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://via.placeholder.com/80x80/6366F1/FFFFFF?text=JD",
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <FontAwesome name="camera" size={12} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Overview */}
        <ProfileSection title="Account Overview">
          <ProfileItem
            icon="dollar"
            title="Monthly Budget"
            subtitle="$2,500.00"
            onPress={() => console.log("Monthly Budget")}
            iconColor="#10B981"
          />
          <ProfileItem
            icon="calendar"
            title="Budget Period"
            subtitle="Monthly (1st - 31st)"
            onPress={() => console.log("Budget Period")}
            iconColor="#F59E0B"
          />
          <ProfileItem
            icon="pie-chart"
            title="Spending Categories"
            subtitle="8 active categories"
            onPress={() => console.log("Categories")}
            iconColor="#8B5CF6"
          />
        </ProfileSection>

        {/* Financial Goals */}
        <ProfileSection title="Financial Goals">
          <ProfileItem
            icon="target"
            title="Savings Goal"
            subtitle="$5,000 / $10,000"
            onPress={() => console.log("Savings Goal")}
            iconColor="#06B6D4"
          />
          <ProfileItem
            icon="chart-line"
            title="Investment Target"
            subtitle="$1,200 / $2,000"
            onPress={() => console.log("Investment")}
            iconColor="#EF4444"
          />
          <ProfileItem
            icon="home"
            title="Emergency Fund"
            subtitle="$3,000 / $5,000"
            onPress={() => console.log("Emergency Fund")}
            iconColor="#F97316"
          />
        </ProfileSection>

        {/* Settings */}
        <ProfileSection title="Settings">
          <ProfileItem
            icon="bell"
            title="Notifications"
            subtitle="Budget alerts & reminders"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                thumbColor={notificationsEnabled ? "#6366F1" : "#9CA3AF"}
                trackColor={{ false: "#374151", true: "#6366F150" }}
              />
            }
          />
          <ProfileItem
            icon="moon-o"
            title="Dark Mode"
            subtitle="App appearance"
            rightComponent={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                thumbColor={darkModeEnabled ? "#6366F1" : "#9CA3AF"}
                trackColor={{ false: "#374151", true: "#6366F150" }}
              />
            }
          />
          <ProfileItem
            icon="fingerprint"
            title="Biometric Login"
            subtitle="Touch ID / Face ID"
            rightComponent={
              <Switch
                value={biometricsEnabled}
                onValueChange={setBiometricsEnabled}
                thumbColor={biometricsEnabled ? "#6366F1" : "#9CA3AF"}
                trackColor={{ false: "#374151", true: "#6366F150" }}
              />
            }
          />
          <ProfileItem
            icon="globe"
            title="Currency"
            subtitle="USD ($)"
            onPress={() => console.log("Currency")}
          />
        </ProfileSection>

        {/* Data & Privacy */}
        <ProfileSection title="Data & Privacy">
          <ProfileItem
            icon="download"
            title="Export Data"
            subtitle="Download your financial data"
            onPress={() => console.log("Export Data")}
            iconColor="#10B981"
          />
          <ProfileItem
            icon="cloud"
            title="Backup & Sync"
            subtitle="Cloud synchronization"
            onPress={() => console.log("Backup")}
            iconColor="#06B6D4"
          />
          <ProfileItem
            icon="shield"
            title="Privacy Settings"
            subtitle="Data protection preferences"
            onPress={() => console.log("Privacy")}
            iconColor="#8B5CF6"
          />
        </ProfileSection>

        {/* Support & Help */}
        <ProfileSection title="Support & Help">
          <ProfileItem
            icon="question-circle"
            title="Help Center"
            subtitle="FAQs and tutorials"
            onPress={() => console.log("Help")}
            iconColor="#10B981"
          />
          <ProfileItem
            icon="comment"
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => console.log("Contact")}
            iconColor="#06B6D4"
          />
          <ProfileItem
            icon="star"
            title="Rate App"
            subtitle="Share your feedback"
            onPress={() => console.log("Rate")}
            iconColor="#F59E0B"
          />
          <ProfileItem
            icon="info-circle"
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => console.log("About")}
            iconColor="#8B5CF6"
          />
        </ProfileSection>

        {/* Account Actions */}
        <ProfileSection title="Account">
          <ProfileItem
            icon="sign-out"
            title="Logout"
            onPress={handleLogout}
            iconColor="#EF4444"
          />
          <ProfileItem
            icon="trash"
            title="Delete Account"
            subtitle="Permanently delete your account"
            onPress={handleDeleteAccount}
            iconColor="#EF4444"
          />
        </ProfileSection>

        {/* Footer spacing */}
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#1F2937",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#6366F1",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6366F1",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1F2937",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#6366F1",
    borderRadius: 20,
  },
  editProfileText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: "#1F2937",
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(75, 85, 99, 0.3)",
  },
  profileItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  profileItemText: {
    flex: 1,
  },
  profileItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 2,
  },
  profileItemSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  footer: {
    height: 100,
  },
});

export default ProfileScreen;

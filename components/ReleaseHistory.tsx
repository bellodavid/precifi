import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

interface ReleaseHistoryItem {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: "completed" | "pending" | "upcoming";
}

const DATA: ReleaseHistoryItem[] = [
  {
    id: "1",
    date: "2025-07-10",
    amount: 50.0,
    description: "Weekly Release - Emergency Fund",
    status: "completed",
  },
  {
    id: "2",
    date: "2025-07-03",
    amount: 50.0,
    description: "Weekly Release - Emergency Fund",
    status: "completed",
  },
  {
    id: "3",
    date: "2025-06-26",
    amount: 50.0,
    description: "Weekly Release - Emergency Fund",
    status: "completed",
  },
  {
    id: "4",
    date: "2025-07-17",
    amount: 50.0,
    description: "Weekly Release - Emergency Fund",
    status: "upcoming",
  },
  {
    id: "5",
    date: "2025-07-24",
    amount: 50.0,
    description: "Weekly Release - Emergency Fund",
    status: "upcoming",
  },
];

const Item = ({ item }: { item: ReleaseHistoryItem }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#34D399";
      case "pending":
        return "#F59E0B";
      case "upcoming":
        return "#6B7280";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "pending":
        return "⏳";
      case "upcoming":
        return "📅";
      default:
        return "📅";
    }
  };

  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.7}>
      <View style={styles.itemContent}>
        <View style={styles.leftContent}>
          <View
            style={[
              styles.statusIcon,
              { backgroundColor: `${getStatusColor(item.status)}20` },
            ]}
          >
            <Text style={styles.statusEmoji}>{getStatusIcon(item.status)}</Text>
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemDate}>
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.itemAmount}>${item.amount.toFixed(2)}</Text>
          <Text
            style={[styles.itemStatus, { color: getStatusColor(item.status) }]}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ReleaseHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Release History</Text>
      <Text style={styles.subtitle}>
        Track your fund releases and upcoming schedules
      </Text>

      <View style={styles.historyContainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 20,
  },
  historyContainer: {
    backgroundColor: "#1F2937",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  item: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(75, 85, 99, 0.2)",
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  statusEmoji: {
    fontSize: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  rightContent: {
    alignItems: "flex-end",
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginBottom: 4,
  },
  itemStatus: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

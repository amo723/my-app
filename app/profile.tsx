// app/(tabs)/profile.tsx
import { ProtectedRoute } from "@/context/ProtectedRoute";
import { View, Text, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Text style={styles.title}>Profile Page</Text>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

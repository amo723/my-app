import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { ActivityIndicator, Alert, Text, View } from "react-native";

function AuthState() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
        <Text>Chargement...</Text>
      </View>
    );
  }
  return <Stack />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <AuthState />
    </AuthProvider>
  );
}

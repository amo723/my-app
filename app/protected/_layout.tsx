import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href={"/login"} />;
  }

  return <Slot />;
}

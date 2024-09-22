import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";

function AuthState() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Vérifie si le composant est monté et prêt à naviguer
    const timeoutId = setTimeout(() => setIsReady(true), 100);

    if (!isLoading && isReady) {
      if (isAuthenticated) {
        router.replace("/MADIBA/home");
      } else {
        router.replace("/login");
      }
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading, isAuthenticated, isReady]);

  if (isLoading || !isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  // Une fois prêt, rendre les pages via le Slot
  return <Slot />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <AuthState />
    </AuthProvider>
  );
}

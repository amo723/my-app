//import liraries
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

// create a component
export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue, {user}!</Text>
      <Text>Tableau de bord protégé</Text>
      <Button title="se déconnecter" onPress={handleLogout} />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
});

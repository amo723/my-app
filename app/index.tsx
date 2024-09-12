import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const navigate = () => {
    if (isAuthenticated) {
      router.push("/protected/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FERME MADIBA</Text>
      <Button title="Accéder" onPress={navigate} />
      <Link href={"/(tabs)/home"} style={styles.link}>
        Go to Home Tab
      </Link>
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
    justifyContent: "center",
    textAlign: "center",
    textTransform: "uppercase",
  },
  link: {
    marginTop: 16,
    color: "blue",
  },
});

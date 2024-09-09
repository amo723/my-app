import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function AboutPage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>About Page</Text>
      <Link href={"/"}>Go back Home</Link>
    </View>
  );
}

import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HomePage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Tab</Text>
      <Link href={"/(tabs)/home"}>Go to Home Tab</Link>
    </View>
  );
}

import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function UpdateModalScreen() {
  const router = useRouter();
  //const itemId = router.query;

  return (
    <View>
      <Text>Modal Page</Text>
      {/*<Text>ID: {itemId}</Text>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

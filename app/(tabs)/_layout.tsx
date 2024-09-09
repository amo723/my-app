import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "loge") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "sujet") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "recolte") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "others") {
            iconName = focused ? "list" : "list-outline";
          }

          // vous pouvez retourner n'importe quel ccomposant ici !
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="loge" options={{ title: "Loge" }} />
      <Tabs.Screen name="sujet" options={{ title: "Sujet" }} />
      <Tabs.Screen name="recolte" options={{ title: "Récolte" }} />
      <Tabs.Screen name="others" options={{ title: "Autres" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}

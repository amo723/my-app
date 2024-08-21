import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "@/components/AppTextInput";
import Font from "@/constants/Font";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

export default function LoginScreen() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(username, password);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login failed:", error);
      // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
    }
  };
  return (
    <SafeAreaView>
      <View style={{ padding: Spacing * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            Login here
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View>
          <AppTextInput
            placeholder="Entrer votre nom utilisateur"
            value={username}
            onChangeText={setUsername}
          />
          <AppTextInput
            placeholder="Entrer votre mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot your password ?
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 2,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: Spacing },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Se connecter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: Spacing }}
          onPress={() => router.push("/register")}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Creer un nouveau compte
          </Text>
        </TouchableOpacity>
        <View style={{ marginVertical: Spacing * 3 }}>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.primary,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Ou continuer avec
          </Text>
        </View>
        <View
          style={{
            marginTop: Spacing,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: Spacing,
              backgroundColor: Colors.gray,
              borderRadius: Spacing / 2,
              marginHorizontal: Spacing,
            }}
          >
            <Ionicons
              name="logo-google"
              color={Colors.text}
              size={Spacing * 2}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: Spacing,
              backgroundColor: Colors.gray,
              borderRadius: Spacing / 2,
              marginHorizontal: Spacing,
            }}
          >
            <Ionicons
              name="logo-facebook"
              color={Colors.text}
              size={Spacing * 2}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: Spacing,
              backgroundColor: Colors.gray,
              borderRadius: Spacing / 2,
              marginHorizontal: Spacing,
            }}
          >
            <Ionicons
              name="logo-twitter"
              color={Colors.text}
              size={Spacing * 2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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

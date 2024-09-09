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

export default function RegisterScreen() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleClick = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      await register(name, username, password);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
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
            Creer un compte
          </Text>
        </View>
        <View>
          {/*<Link href="/tab_1">Go to tab 1</Link>
            <Pressable onPress={() => router.push('/tab_2')}>
                <Text>Go to tab 2</Text>
            </Pressable>*/}
          <AppTextInput
            placeholder="Entrer votre nom et prenom"
            value={name}
            onChangeText={setName}
          />
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
        <TouchableOpacity
          onPress={handleClick}
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
            Enregistrer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: Spacing }}
          onPress={() => router.push("/login")}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Vous avez deja un compte
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

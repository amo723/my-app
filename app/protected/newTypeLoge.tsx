// app/(tabs)/profile.tsx

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import api from "@/constants/api";
import { Button } from "react-native-elements";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Font from "@/constants/Font";
import AppTextInput from "@/components/AppTextInput";
import { Colors } from "@/constants/Colors";

export default function NewTypeLoge() {
  const [surface, setSurface] = useState("");
  const [capaciteMax, setCapaciteMax] = useState("");

  const handleClick = async () => {
    await api
      .post(`typeLoge/new`, {
        surface: surface,
        capacite_max: capaciteMax,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Type de loge enregistre avec succes");
          router.replace("/protected/typeLoge");
        }
        if (response.status === 202) {
          alert(`Le type de loge avec pour surface ${surface} existe deja`);
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
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
              Nouveau type de loge
            </Text>
          </View>
          <View>
            <Text style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>
              Surface
            </Text>
            <AppTextInput
              placeholder="Saisir la surface"
              value={surface}
              onChangeText={setSurface}
            />
            <Text style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>
              Capacité maximale
            </Text>
            <AppTextInput
              placeholder="Saisir la capacite maximale"
              value={capaciteMax}
              onChangeText={setCapaciteMax}
            />
          </View>
          <Pressable
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
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    backgroundColor: "#ded",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 60,
    resizeMode: "contain",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#000",
    marginStart: 20,
    marginBottom: 50,
    marginTop: 20,
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
    paddingLeft: 10,
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

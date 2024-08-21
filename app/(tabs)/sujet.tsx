// app/(tabs)/profile.tsx

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import api from "@/constants/api";
import { Button } from "react-native-elements";
import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Font from "@/constants/Font";
import { ProtectedRoute } from "@/context/ProtectedRoute";

const { width, height } = Dimensions.get("screen");

const BG_ING = "";
const SPACING = 20;
const AVATAR_SIZE = 70;

type ItemType = {
  id: string;
  libelle: any;
};

export default function SujetScreen() {
  const [sujets, setSujets] = useState<ItemType[]>([]);
  const [data, setData] = useState([]);

  const handleModify = (item: any) => {
    console.log("Modifier l'élément");
  };

  const handleDelete = (item: any) => {
    console.log("Supprimer l'élément");
  };

  useEffect(() => {
    const types: any = [];
    const func = async () => {
      await api
        .get(`sujet`)
        .then(function (response) {
          if (response.status === 200) {
            const data = response.data.results;
            data.map((item: any) => {
              console.log(item);
              types.push({
                id: item.id,
                libelle: item.date,
              });
            });
            setSujets(types);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    func();

    return () => {};
  }, []);

  return (
    <ProtectedRoute>
      <View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing,
            }}
          >
            Sujets
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/screens/newSujet")}
            style={{
              marginHorizontal: 10,
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
            <Ionicons name="add" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={sujets}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: StatusBar.currentHeight || 42,
          }}
          style={{ paddingVertical: 40 }}
          renderItem={({ item }) => (
            <View
              style={{
                margin: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            >
              <View>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                  {item.libelle}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="create"
                  size={25}
                  onPress={() => handleModify(item)}
                />
                <Ionicons
                  name="trash"
                  size={25}
                  onPress={() => handleDelete(item)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ProtectedRoute>
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

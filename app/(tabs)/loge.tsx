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
import { useCallback, useEffect, useState } from "react";
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

export default function LogeScreen() {
  const [loges, setLoges] = useState<ItemType[]>([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const types: any = [];
    const func = async () => {
      await api
        .get(`loge`)
        .then(function (response) {
          if (response.status === 200) {
            const data = response.data.results;
            data.map((item: any) => {
              types.push({
                id: item.id,
                libelle: item.libelle,
              });
            });
            setLoges(types);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    func();

    return () => {};
  }, []);

  // Utilser 'useCallback' pour mémoriser la fonction 'deleteItem', ce qui empêchera sa recréation à chaque rendu du composant
  const deleteItem = useCallback(
    async (element: any) => {
      console.log("Supprimer l'élément");
      if (confirm("Voulez-vous vraiment effectuer cette suppression ?")) {
        await api
          .delete(`loge/delete/${element.id}`)
          .then((response) => {
            if (response.status === 204) {
              setLoges((prevItems) =>
                prevItems.filter((item) => item.id !== element.id)
              );
              alert("Loge supprimée avec succes");
            } else {
              alert("Erreur lors de la suppression de la loge");
              return;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    [setLoges]
  );

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
            Loges
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
            onPress={() => router.push("/screens/typeLoge")}
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
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Types de loge
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/screens/newLoge")}
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
          data={loges}
          extraData={loges}
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
                <Link href={`/updateModal/${item}`} asChild>
                  <TouchableOpacity>
                    <Ionicons name="create" size={25} asChild />
                  </TouchableOpacity>
                </Link>
                <Ionicons
                  name="trash"
                  size={25}
                  onPress={() => deleteItem(item)}
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

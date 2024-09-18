// app/(tabs)/profile.tsx

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  StatusBar,
  Modal,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import api from "@/constants/api";
import { Button } from "react-native-elements";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Font from "@/constants/Font";
import AppTextInput from "@/components/AppTextInput";
import { Colors } from "@/constants/Colors";

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    //https://api.restful-api.dev/objects
    const types: any = [];

    async function fetchData() {
      let apiData: any = null;

      try {
        const response = await fetch("https://doctor.backbone-corp.com:8013/loge", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Ajouter d'autres en-têtes si nécessaire
          },
        });

        if (!response.ok) {
          // Si la réponse n'est pas "ok", vous pouvez également récupérer des détails de l'erreur de l'API
          const errorDetails = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorDetails}`
          );
        }

        apiData = await response.json(); // Stocker les données dans la variable
      } catch (error) {
        // Capture des détails spécifiques sur l'erreur
        if (error instanceof Error) {
          console.error("Error message:", error.message); // Le message d'erreur
          console.error("Error stack:", error.stack); // La pile de l'erreur
        } else {
          console.error("Unexpected error:", error); // Erreurs non conventionnelles
        }
      }

      return apiData;
    }

    // Exemple d'appel de la fonction
    fetchData().then((data) => {
      // Vous pouvez utiliser 'data' ici si nécessaire
      console.log("data received", data);
      data.results.map((item: any) => {
        types.push({
          id: item.id,
          libelle: item.libelle,
        });
      });
      setLoges(types);
    });

    /*const func = async () => {
      await fetch("http://kerneltech.cloud/loge", {
        method: "GET", // ou 'POST', 'PUT', etc.
        headers: {
          "Content-Type": "application/json",
          // Ajouter d'autres en-têtes si nécessaire
        },
      })
        .then((response) => response.json())
        .then((data) => console.log("data", data.results))
        .catch((error) => console.error("Error:", error));

      await api
        .get(`loge`)
        .then(function (response) {
          console.log(response);
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
          console.log("error", error);
        });
    };
    func();*/

    return () => {};
  }, []);

  // Utilser 'useCallback' pour mémoriser la fonction 'deleteItem', ce qui empêchera sa recréation à chaque rendu du composant
  const deleteItem = useCallback(
    async (element: any) => {
      // Alerte de confirmation avant de supprimer
      Alert.alert(
        "Confirmation", // Titre de l'alerte
        "Voulez-vous vraiment effectuer cette suppression ?", // Message
        [
          {
            text: "Annuler", // Si l'utilisateur annule
            onPress: () => console.log("Suppression annulée"),
            style: "cancel",
          },
          {
            text: "Supprimer", // Si l'utilisateur confirme
            onPress: async () => {
              try {
                const response = await api.delete(`loge/delete/${element.id}`);
                if (response.status === 204) {
                  setLoges((prevItems) =>
                    prevItems.filter((item) => item.id !== element.id)
                  );
                  Alert.alert("Succès", "Loge supprimée avec succès");
                } else {
                  Alert.alert("Erreur", "Erreur lors de la suppression de la loge");
                }
              } catch (error) {
                console.log(error);
                Alert.alert("Erreur", "Une erreur est survenue lors de la suppression");
              }
            },
          },
        ],
        { cancelable: false } // Empêche la fermeture en appuyant en dehors de l'alerte
      );
    },
    [setLoges]
  );

  return (
    <>
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
            margin: 15,
          }}
        >
          <Pressable
            onPress={() => router.push("/protected/typeLoge")}
            style={{
              marginHorizontal: 10,
              paddingHorizontal: Spacing,
              backgroundColor: Colors.primary,
              marginVertical: Spacing,
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
                padding: 15,
              }}
            >
              Types de loge
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/protected/newLoge")}
            style={{
              marginHorizontal: 10,
              padding: Spacing,
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
          </Pressable>
        </View>
        <FlatList
          data={loges}
          extraData={loges}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: StatusBar.currentHeight || 42,
          }}
          style={{ paddingVertical: 20 }}
          renderItem={({ item }) => (
            <View
              style={{
                margin: 2,
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
                {/*<Link href={`/updateModal/${item}`} asChild>
                    <TouchableOpacity>
                      <Ionicons name="create" size={25} />
                    </TouchableOpacity>
                    </Link>*/}
                <Ionicons
                  name="create"
                  size={25}
                  onPress={() => setIsVisible(true)}
                />
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
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5",
            padding: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                paddingBottom: 10,
              }}
            >
              <Text>Titre du modale</Text>
            </View>
            <Text style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>
              Libellé
            </Text>
            <AppTextInput placeholder="Saisir le libelle" />
            <Button title="Fermer" onPress={() => setIsVisible(false)} />
          </View>
        </Modal>
      </View>
    </>
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

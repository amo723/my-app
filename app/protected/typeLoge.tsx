// app/(tabs)/profile.tsx

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
  Alert,
  Button,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import api from "@/constants/api";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Font from "@/constants/Font";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("screen");

const BG_ING = "";
const SPACING = 20;
const AVATAR_SIZE = 70;

type ItemType = {
  id: string;
  libelle: any;
};

export default function TypeLoge() {
  const [typeLoges, setTypeLoges] = useState<ItemType[]>([]);
  const [data, setData] = useState([]); // État pour stocker les données
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  const handleModify = (item: any) => {
    console.log("Modifier l'élément");
  };

  useEffect(() => {
    const types: any = [];

    async function fetchData() {
      let apiData: any = null;

      try {
        const response = await fetch(
          "https://doctor.backbone-corp.com:8013/typeLoge",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Ajouter d'autres en-têtes si nécessaire
            },
          }
        );

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
      console.log("typeLoges", data);
      data.results.map((item: any) => {
        types.push({
          id: item.id,
          libelle: item.surface,
        });
      });
      setTypeLoges(types);
    });

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
                const response = await api.delete(`typeLoge/delete/${element.id}`);
                if (response.status === 204) {
                  setTypeLoges((prevItems) =>
                    prevItems.filter((item) => item.id !== element.id)
                  );
                  Alert.alert("Succès", "Type de loge supprimé avec succès");
                } else {
                  Alert.alert("Erreur", "Erreur lors de la suppression du type de loge");
                }
              } catch (error) {
                console.log(error);
                Alert.alert("Erreur", "Une erreur est survenue");
              }
            },
          },
        ],
        { cancelable: false } // Empêche la fermeture en appuyant en dehors de l'alerte
      );
    },
    [setTypeLoges]
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
            Types de loge
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
          <Pressable
            onPress={() => router.push("/protected/newTypeLoge")}
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
          </Pressable>
        </View>
        <FlatList
          data={typeLoges}
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
                  onPress={() => deleteItem(item)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ded",
    paddingTop: 22,
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

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
import { apiUrl } from "@/constants/config";

const { width, height } = Dimensions.get("screen");

const BG_ING = "";
const SPACING = 20;
const AVATAR_SIZE = 70;

type ItemType = {
  id: string;
  libelle: any;
  surface: string;
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
        const response = await fetch(`${apiUrl}/loge`, {
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
          surface: item.typeLoge.surface,
        });
      });
      console.log(types)
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
      <View style={styles.headerContainer}>
        {/* Titre à côté du bouton flottant */}
        <Text style={styles.headerTitle}>GESTION DES LOGES</Text>
        <Pressable style={styles.fab} onPress={() => router.push("/protected/newLoge")}>
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </View>
      
      <View style={{ flex: 1, marginTop: SPACING , marginHorizontal: 2, marginBottom: 2 }}>
          {/* Simuler la légende */}
          <Text style={styles.legend}>LISTE DES LOGES</Text>
          {/* Simuler le fieldset */}
          <View style={styles.fieldset}>
            <FlatList
                data={loges}
                extraData={loges}
                contentContainerStyle={{
                  padding: 15,
                  paddingTop: StatusBar.currentHeight || 42,
                }}
                style={{ paddingVertical: 18 }}
                renderItem={({ item }) => (
                  <View
                    style={{
                      margin: 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: SPACING,
                      marginBottom: SPACING,
                      backgroundColor: "lightblue",
                      borderRadius: 12,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 10 },
                      shadowOpacity: 0.3,
                      shadowRadius: 20,
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 22, fontWeight: "700" }}>
                        {item.libelle}   <Text style={{ fontSize: 18, color: 'green', fontWeight: "700" }}>({item.surface})</Text>
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
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "right"
  },

  fieldset: {
    flex: 1, // Pour que le fieldset prenne tout l'espace restant en bas
    borderColor: Colors.primary, // Couleur de la bordure verte
    borderWidth: 2,
    borderRadius: 8, // Arrondir les coins
    marginTop: 5,
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
  fab: {
    position: 'absolute',
    top: 10, // Distance du bas de l'écran
    right: 20,  // Distance du côté droit de l'écran
    backgroundColor: Colors.primary, // '#6200ee', Couleur de fond du bouton
    borderRadius: 50, // Pour arrondir le bouton
    padding: 15, // Taille du bouton
    elevation: 5, // Pour l'ombre (uniquement Android)
  },
  legend: {
    fontSize: FontSize.large,
    color: Colors.primary,
    fontFamily: Font["poppins-bold"],
    //fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute', // Position pour placer le texte au-dessus du "fieldset"
    top: 5,
    left: 30,
    backgroundColor: '#f5f5f5', // Même couleur que le fond pour masquer la bordure
    paddingHorizontal: 10,
    zIndex: 1, // S'assurer que la légende est au-dessus du fieldset
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

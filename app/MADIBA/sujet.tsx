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
};

export default function SujetScreen() {
  const [sujets, setSujets] = useState<ItemType[]>([]);
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

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
                libelle: getFormattedDateFR(new Date(item.date)),
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

  const getFormattedDateFR = (date: Date): string => {
    // Options pour formater la date en français
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    // Options pour formater l'heure
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    // Utilisation de Intl.DateTimeFormat pour formater la date
    const formattedDate: string = new Intl.DateTimeFormat(
      "fr-FR",
      dateOptions
    ).format(date);
    // Utilisation de Intl.DateTimeFormat pour formater l'heure
    const formattedTime: string = new Intl.DateTimeFormat(
      "fr-FR",
      timeOptions
    ).format(date);

    // Combinez la date et l'heure formatées
    //console.log(`${formattedDate} - ${formattedTime}`);
    //return `${formattedDate} - ${formattedTime}`;
    return `${formattedTime}`;
  };

  // Utilser 'useCallback' pour mémoriser la fonction 'deleteItem', ce qui empêchera sa recréation à chaque rendu du composant
  const deleteItem = useCallback(
    async (element: any) => {
      // Alerte de confirmation avant de supprimer
      Alert.alert(
        "Confirmation", // Titre de l'alerte
        "Voulez-vous vraiment effectuer cette suppression ?", // Message
        [
          {
            text: "Annuler", // Bouton Annuler
            onPress: () => console.log("Suppression annulée"),
            style: "cancel", // Style du bouton pour annuler
          },
          {
            text: "Supprimer", // Bouton pour confirmer
            onPress: async () => {
              try {
                const response = await api.delete(`sujet/delete/${element.id}`);
                if (response.status === 204) {
                  setSujets((prevItems) =>
                    prevItems.filter((item) => item.id !== element.id)
                  );
                  Alert.alert("Succès", "Sujet supprimé avec succès");
                } else {
                  Alert.alert("Erreur", "Erreur lors de la suppression du sujet");
                }
              } catch (error) {
                console.log(error);
                Alert.alert("Erreur", "Une erreur est survenue");
              }
            },
          },
        ],
        { cancelable: false } // Empêche la fermeture de l'alerte sans interaction avec les boutons
      );
    },
    [setSujets]
  );

  return (
    <>
      <View style={styles.headerContainer}>
        {/* Titre à côté du bouton flottant */}
        <Text style={styles.headerTitle}>GESTION DES SUJETS</Text>
        <Pressable style={styles.fab} onPress={() => router.push("/protected/newSujet")}>
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </View>
      
      <View style={{ flex: 1, marginTop: SPACING , marginHorizontal: 2, marginBottom: 2 }}>
          {/* Simuler la légende */}
          <Text style={styles.legend}>LISTE DES SUJETS</Text>
          {/* Simuler le fieldset */}
          <View style={styles.fieldset}>
            <FlatList
                data={sujets}
                extraData={sujets}
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

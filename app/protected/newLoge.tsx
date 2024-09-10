// app/(tabs)/profile.tsx

import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import api from "@/constants/api";
import { Button, CheckBox } from "react-native-elements";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Font from "@/constants/Font";
import AppTextInput from "@/components/AppTextInput";
import AppSelectComponent from "@/components/AppSelect";
import { Colors } from "@/constants/Colors";

interface Data {
  label: string;
  value: string;
}

export default function NewTypeLoge() {
  const [data, setData] = useState<Data[]>([]);
  const [type, setType] = useState("");
  const [libelle, setLibelle] = useState("");
  const [isSelected, setIsSelected] = useState(false);


useEffect(() => {
  const types: Data[] = [];

  const func = async () => {
    try {
      const response = await fetch('https://kerneltech.cloud/typeLoge', {
        method: 'GET', // Spécifie la méthode de la requête
        headers: {
          'Content-Type': 'application/json', // Spécifie le type de contenu attendu
        },
      });

      if (response.ok) {
        const data = await response.json();
        data.results.map((item: any) => {
          types.push({
            value: item.id,
            label: item.surface,
          });
        });
        setData(types);
      } else {
        console.error('Erreur de la requête:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  func();

  return () => {};
}, []);


  /*useEffect(() => {
    const types: Data[] = [];
    const func = async () => {
      await api
        .get(`typeLoge`)
        .then(function (response) {
          if (response.status === 200) {
            const data = response.data.results;
            data.map((item: any) => {
              types.push({
                value: item.id,
                label: item.surface,
              });
            });
            setData(types);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    func();

    return () => {};
  }, []);*/

  const toggleCheckbox = () => {
    setIsSelected(!isSelected);
  };

  const handleTypeChange = (itemValue: string) => {
    console.log(itemValue);
    setType(itemValue);
  };

  const handleClick = async () => {
    try {
      const response = await fetch('https://kerneltech.cloud/loge/new', {
        method: 'POST', // Spécifie la méthode POST
        headers: {
          'Content-Type': 'application/json', // Spécifie le type de contenu
        },
        body: JSON.stringify({
          typeLoge: type,
          libelle: libelle,
          active: isSelected,
          date_activation_desactivation: new Date(),
        }), // Convertit les données en JSON pour l'envoi
      });
  
      if (response.status === 201) {
        alert('Loge enregistrée avec succès');
        router.replace('/loge');
      } else if (response.status === 202) {
        alert('Cette loge existe déjà');
      } else {
        console.error('Réponse inattendue du serveur:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };
  

  /*const handleClick = async () => {
    await api
      .post(`loge/new`, {
        typeLoge: type,
        libelle: libelle,
        active: isSelected,
        date_activation_desactivation: new Date(),
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Loge enregistree avec succes");
          router.replace("/loge");
        }
        if (response.status === 202) {
          alert(`Cette loge existe deja`);
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };*/

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
              Nouvelle loge
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>
              Type de loge
            </Text>
            <AppSelectComponent
              data={data}
              selectedValue={type}
              onValueChange={handleTypeChange}
            />
          </View>
          <View>
            <Text style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>
              Libellé
            </Text>
            <AppTextInput
              value={libelle}
              onChangeText={setLibelle}
              placeholder="Saisir le libelle"
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <CheckBox
                title="Activer la loge?"
                checked={isSelected}
                onPress={toggleCheckbox}
              />
            </View>
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
    fontWeight: 700,
    marginBottom: 20,
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
  picker: {
    width: "100%",
    padding: Spacing,
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
    textAlignVertical: "top",
  },
  item: {
    fontSize: 18,
    color: "black",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
  placeholder: {
    color: "gray",
    fontSize: 16,
  },
  disabledInput: {
    color: "gray",
    backgroundColor: "#f2f2f2",
  },
});

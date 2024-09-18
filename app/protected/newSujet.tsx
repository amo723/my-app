// app/(tabs)/profile.tsx

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import api from "@/constants/api";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Font from "@/constants/Font";
import AppSelectComponent from "@/components/AppSelect";
import { Colors } from "@/constants/Colors";

interface Data {
  label: string;
  value: string;
}

export default function NewSujet() {
  const [idLoge, setIdLoge] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const [data, setData] = useState<Data[]>([]);
  const [typeEntree, setTypeEntree] = useState<string | "">("");
  const [loge, setLoge] = useState<string | "">("");

  const items = [
    { id: "0", label: "Achat", value: "0" },
    { id: "1", label: "Eclosion", value: "1" },
    { id: "2", label: "Mutation", value: "2" },
  ];

  useEffect(() => {
    const types: Data[] = [];
    const func = async () => {
      await api
        .get(`loge`)
        .then(function (response) {
          if (response.status === 200) {
            const data = response.data.results;
            data.map((item: any) => {
              types.push({
                value: item.id,
                label: item.libelle,
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
  }, []);

  const toggleCheckbox = () => {
    setIsSelected(!isSelected);
  };

  const handleLogeChange = (itemValue: string) => {
    console.log(itemValue);
    setLoge(itemValue);
  };
  const handleTypeEntreeChange = (itemValue: string) => {
    console.log(itemValue);
    setTypeEntree(itemValue);
  };

  const handleClick = async () => {
    await api
      .post(`sujet/new`, {
        id_loge: idLoge,
        type_entree: typeEntree,
        date_entree_sujet: new Date(),
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Nouveau sujet ajouté avec succes");
          router.replace("/sujet");
        }
        if (response.status === 202) {
          alert(`Ce sujet existe deja`);
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
              Nouveau sujet
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                marginVertical: 20,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Loge
            </Text>
            <AppSelectComponent
              data={data}
              selectedValue={loge}
              onValueChange={handleLogeChange}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                marginVertical: 20,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Type d'entrée
            </Text>
            <AppSelectComponent
              data={items}
              selectedValue={typeEntree}
              onValueChange={handleTypeEntreeChange}
            />
          </View>
          <Pressable
            onPress={handleClick}
            style={{
              padding: 15,
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

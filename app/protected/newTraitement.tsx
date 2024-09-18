// app/(tabs)/profile.tsx

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Pressable,
    Alert,
  } from "react-native";
  import { Link, router } from "expo-router";
  import { useEffect, useState } from "react";
  import { Button, CheckBox } from "react-native-elements";
  import api from "@/constants/api";
  import Spacing from "@/constants/Spacing";
  import FontSize from "@/constants/FontSize";
  import { Colors } from "@/constants/Colors";
  import Font from "@/constants/Font";
  import AppSelectComponent from "@/components/AppSelect";
  import AppTextInput from "@/components/AppTextInput";
  
  
  interface Data {
    label: string;
    value: string;
  }
  
  export default function NewTraitement() {
    const [data, setData] = useState<Data[]>([]);
    const [type, setType] = useState("");
    const [libelle, setLibelle] = useState("");
    const [isSelected, setIsSelected] = useState(false);
  
  
    const toggleCheckbox = () => {
      setIsSelected(!isSelected);
    };
  
    const handleTypeChange = (itemValue: string) => {
      console.log(itemValue);
      setType(itemValue);
    };
  
  
  
    const handleClick = async () => {
      await api
        .post(`traitement/new`, {
          typeLoge: type,
          libelle: libelle,
          active: isSelected,
          date_activation_desactivation: new Date(),
        })
        .then((response) => {
          if (response.status === 201) {
            alert("Traitement enregistree avec succes");
            router.replace("/anomalie");
          }
          if (response.status === 202) {
            alert(`Ce traitement existe deja`);
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
                Nouveau Traitement
              </Text>
            </View>
  
            <View>
              <Text style={{ justifyContent: 'center', textAlign: "center", marginTop: 20, fontWeight: 700, fontSize: 16 }}>
                En cours de developpement...
              </Text>
  
            </View>
  
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
  
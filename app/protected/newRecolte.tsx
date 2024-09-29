// app/(tabs)/profile.tsx

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import api from "@/constants/api";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Font from "@/constants/Font";
import AppTextInput from "@/components/AppTextInput";
import AppSelectComponent from "@/components/AppSelect";
import { Colors } from "@/constants/Colors";
//import { Colors } from "react-native/Libraries/NewAppScreen";

interface Data {
  label: string;
  value: string;
}


export default function NewRecolte() {
  const [surface, setSurface] = useState("");
  const [capaciteMax, setCapaciteMax] = useState("");

  const [data, setData] = useState<Data[]>([]);
  const [idLoge, setIdLoge] = useState("");
  const [anomalie, setAnomalie] = useState<string | "">("");
  const [nbrePonte, setNbrePonte] = useState("");
  const [obs, setObs] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const items = [
    { id: "0", label: "Coque fissuree", value: "0" },
    { id: "1", label: "Oeuf(s) mal forme(s)", value: "1" },
    { id: "2", label: "Oeuf(s) anormalement gros", value: "2" },
    { id: "3", label: "Oeuf(s) anormalement petit(s)", value: "3" },
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
              console.log(item);
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

  const handleLogeChange = (itemValue: string) => {
    console.log(itemValue);
    setIdLoge(itemValue);
  };

  const handleAnomalieChange = (itemValue: string) => {
    console.log(itemValue);
    setAnomalie(itemValue);
  };

  const toggleCheckbox = () => {
    setIsSelected(!isSelected);
  };

  const handleClick = async () => {
    await api
      .post(`recolte/new`, {
        id_loge: idLoge,
        nbre_ponte: nbrePonte,
        anomalie: anomalie,
        observation: obs,
        date_recolte: new Date(),
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Nouvelle récolte ajoutée avec succes");
          router.replace("/recolte");
        }
        if (response.status === 202) {
          alert(`Cette récolte existe deja`);
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
              Nouvelle récolte
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
              selectedValue={idLoge}
              onValueChange={handleLogeChange}
            />
          </View>
          <View>
            <Text style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>
              Nombre de ponte
            </Text>
            <AppTextInput
              placeholder="Saisir le nombre de pontes"
              value={nbrePonte}
              onChangeText={setNbrePonte}
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
              Anomalie
            </Text>
            <AppSelectComponent
              data={items}
              selectedValue={anomalie}
              onValueChange={handleAnomalieChange}
            />
          </View>
          <View>
            <Text style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>
              Observations
            </Text>
            <AppTextInput
              placeholder="Saisir vos observations"
              value={obs}
              onChangeText={setObs}
              multiline={true}
              numberOfLines={4}
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

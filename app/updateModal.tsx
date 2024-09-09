import AppTextInput from "@/components/AppTextInput";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button } from "react-native";
import { Modal, Text, View } from "react-native";
import { StyleSheet } from "react-native";

interface ModalState {
  visible: boolean;
}

export default function UpdateModalScreen<ModalState>({}) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <Button title="Ouvrir la modale" onPress={() => setIsVisible(true)} />
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

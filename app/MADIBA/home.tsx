import { Link } from "expo-router";
import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";
import Spacing from "@/constants/Spacing";
import { Colors } from "@/constants/Colors";
import Font from "@/constants/Font";
import FontSize from "@/constants/FontSize";

const { width, height } = Dimensions.get('window'); // Obtenez la largeur et la hauteur de la fenêtre



export default function HomePage() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/malimba-icon.png')} // chemin relatif vers votre image
        style={styles.image} // Utilisez les styles définis ci-dessous
        resizeMode="stretch" // Utilisez "cover" ou "contain" selon vos besoins
      >
        <View style={styles.overlay}>
          <Link style={styles.link} href={"/MADIBA/loge"}>
            <Text style={styles.text}>Consulter les loges</Text>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  image: {
    width: '100%', // Prendre toute la largeur de l'écran
    height: height * 0.20, // Prendre toute la hauteur de l'écran
    justifyContent: 'center', // Centrer le contenu si besoin
    marginTop: 200
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.2)', // Un overlay semi-transparent
    position: 'absolute',
    top: -150, // Ajustez cette valeur selon la distance par rapport au haut de l'écran
    left: 0,
    right: 0,
    //alignItems: 'center', // Centrer horizontalement
    zIndex: 1, // S'assurer que le bouton reste au-dessus des autres éléments si nécessaire
  },
  link: {
    padding: Spacing * 2,
    backgroundColor: "#009FFF",
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: Spacing },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  text: {
    fontFamily: Font["poppins-bold"],
    color: 'white',
    textAlign: "center",
    fontSize: FontSize.large,
    padding: 15,
  },
});

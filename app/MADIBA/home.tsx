import { Link } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Spacing from "@/constants/Spacing";
import { Colors } from "@/constants/Colors";
import Font from "@/constants/Font";
import FontSize from "@/constants/FontSize";


export default function HomePage() {
  return (


    <LinearGradient
      // Ces couleurs correspondent à ton dégradé CSS
      colors={['rgba(2,0,36,1)', 'rgba(9,9,121,1)', 'rgba(0,212,255,1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>BIENVENUE A LA FERME</Text>
        <Text style={styles.text}>MADIBA</Text>
        <Link href={"/MADIBA/loge"} style={{
              marginHorizontal: 10,
              padding: Spacing * 2,
              backgroundColor: Colors.onPrimary,
              marginVertical: Spacing,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: Spacing },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}><Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.primary,
              textAlign: "center",
              fontSize: FontSize.large,
              padding: 15,
            }}
          >
            Consulter les loges
          </Text></Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',    // Couleur blanche pour contraster avec le dégradé
    fontWeight: 'bold',
  },
});

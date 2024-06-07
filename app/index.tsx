import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  console.log('In Index', isLoggedIn, isLoading);

  const handlePressSubmit = () => {
    if (!isLoading && isLoggedIn) {
      router.push("/home");
    } else {
      console.log('In Index Click Else');    
      router.push("/sign-in");
    }
  }
  
  const imgPath = require("../assets/images/path.png");

  return (
    <SafeAreaView style={style.container}>
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.font}>
          <Text style={style.title}>PlaSeC</Text>
          <Image
            source={imgPath}
            style={style.logo_raya}
          />
          <Image
            source={require("@/assets/images/logo.png")}
            style={style.logo}
          />
        <Text style={style.subtitle}>Primera Plataforma de Seguridad Comunitaria de la Provincia de Formosa</Text>
        {/* <StatusBar style="auto" /> */}
        {/* <Link href="/home" style={{ color: 'blue' }}>Go to Home</Link> */}
        <CustomButton
          title={isLoggedIn ? "Menu" : "Iniciar Sesión"}
          handlePress={handlePressSubmit}
          containerStyle={{ marginTop: 20 }}
          textStyle={{ color: "blue" }}
          isLoading={false}
        />
        </View>
      </ScrollView>

      {/* <StatusBar
        style="light"
        backgroundColor="rgba(103, 80, 164, 1)"
        // translucent={false}
      /> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: 'rgba(103, 80, 164, 1)',
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 50,
  },
  font: {
    color: "white",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 85,
  },
  logo: {
    width: '50%',
    height: '50%',
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
  },
  logo_raya: {
    resizeMode: "contain",
    width: '30%',
    marginTop: -20,
    marginStart: '30%',
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    display: 'flex',
  },
});
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView contentContainerStyle={style.container}>
        <View>
          <Image
            source={require("../assets/images/logo.jpg")}
            style={style.logo}
          />
        <Text style={style.title}>Edit app/index.tsx to edit this screen.</Text>
        <StatusBar style="auto" />
        <Link href="/home" style={{ color: 'blue' }}>Go to Home</Link>
        </View>
      </ScrollView>
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
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    display: "flex"
  },
});
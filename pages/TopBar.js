import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const TopBar = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{route.name}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "lightblue",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    paddingHorizontal: 10, // Ajuste de margen horizontal para los elementos dentro de la barra de navegación
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
});

export default TopBar;
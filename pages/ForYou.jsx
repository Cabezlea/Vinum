import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ForYouPage = () => {
  // Ejemplo de datos simulados de vinos
  const wines = [
    {
      id: 1,
      name: 'Malbec Reserva',
      year: 2019,
      imageUrl: 'https://example.com/malbec.jpg',
      description: 'Elegante Malbec con notas a frutos negros y vainilla.',
    },
    {
      id: 2,
      name: 'Chardonnay Gran Reserva',
      year: 2020,
      imageUrl: 'https://example.com/chardonnay.jpg',
      description: 'Chardonnay con cuerpo y aromas a frutas tropicales.',
    },
    // Puedes agregar más vinos simulados según sea necesario
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {wines.map((wine) => (
        <View key={wine.id} style={styles.wineContainer}>
          <Image source={{ uri: wine.imageUrl }} style={styles.wineImage} />
          <View style={styles.wineInfo}>
            <Text style={styles.wineName}>{wine.name}</Text>
            <Text style={styles.wineYear}>{wine.year}</Text>
            <Text style={styles.wineDescription}>{wine.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  wineContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  wineImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  wineInfo: {
    flex: 1,
    padding: 10,
  },
  wineName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  wineYear: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  wineDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export default ForYouPage;

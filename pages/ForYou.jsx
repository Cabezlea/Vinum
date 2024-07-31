import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ForYou = () => {
  // Example wine data with Imgur image URLs
  const wines = [
    {
      id: 1,
      name: 'Malbec Reserva',
      year: 2019,
      imageUrl: 'https://media.nicks.com.au/products/86cd57ba/terrazas-reserva-malbec.jpg', // Replace with actual Imgur URL
      description: 'Elegante Malbec con notas a frutos negros y vainilla. Este vino se destaca por su cuerpo robusto y taninos suaves, ideal para acompañar carnes rojas y platos especiados. Su crianza en barricas de roble le confiere un toque de complejidad adicional, con un final largo y persistente.',
    },
    {
      id: 2,
      name: 'Chardonnay Gran Reserva',
      year: 2020,
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lJGLM4mQWIjYGggHC7dznwHaJ4%26pid%3DApi&f=1&ipt=6fb16f0604e766e7ebbf85dcf5935e7fa54567cfdfa30792e71c23703283b209&ipo=images', // Replace with actual Imgur URL
      description: 'Chardonnay con cuerpo y aromas a frutas tropicales. Este vino presenta notas de piña, mango y un ligero toque de mantequilla debido a su crianza en barricas. Su acidez balanceada y su textura cremosa lo hacen perfecto para maridar con pescados grasos y platos con salsas ricas.',
    },
    // Add more wines if needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {wines.map((wine) => (
        <View key={wine.id} style={styles.wineCard}>
          <Text style={styles.wineName}>{wine.name}</Text>
          <Image source={{ uri: wine.imageUrl }} style={styles.wineImage} />
          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.wineDescription}>{wine.description}</Text>
          </ScrollView>
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
    backgroundColor: '#f4f4f4', // Light background color for better contrast
  },
  wineCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden', // Ensures the shadow effect is applied correctly
    alignItems: 'center', // Center-aligns content horizontally
    height: 'auto', // Adjust height as neede
  },
  wineName: {
    fontSize: 20,
    color: '#333', // Darker color for better readability
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Centers the text
  },
  wineImage: {
    width: '90%', // Adjust width as needed
    height: '80%', // Adjust height as needed
    borderRadius: 10,
    marginBottom: 10,
  },
  descriptionContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden', // Ensures the shadow effect is applied correctly

  },
  wineDescription: {
    fontSize: 15,
    color: '#333', // Darker color for better readability
    fontWeight: 'bolder',
    lineHeight: 20,
    textAlign: 'center', // Centers the text
  },
});

export default ForYou;

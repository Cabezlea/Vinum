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
      description: 'Elegant Malbec with notes of dark fruits and vanilla. This wine stands out for its robust body and smooth tannins, ideal for pairing with red meats and spiced dishes. Its aging in oak barrels adds a touch of complexity, with a long and persistent finish.',
    },
    {
      id: 2,
      name: 'Chardonnay Gran Reserva',
      year: 2020,
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lJGLM4mQWIjYGggHC7dznwHaJ4%26pid%3DApi&f=1&ipt=6fb16f0604e766e7ebbf85dcf5935e7fa54567cfdfa30792e71c23703283b209&ipo=images', // Replace with actual Imgur URL
      description: 'Full-bodied Chardonnay with tropical fruit aromas. This wine presents notes of pineapple, mango, and a slight hint of butter due to its barrel aging. Its balanced acidity and creamy texture make it perfect for pairing with fatty fish and rich sauce dishes.',
    },
    {
      id: 3,
      name: 'Syrah Reserva',
      year: 2018,
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatics.angeloni.com.br%2Fsuper%2Ffiles%2Fprodutos%2F3782590%2F3782590_1_zoom.jpg&f=1&nofb=1&ipt=fd08cca0a9f8be55ad8bfc2b616a41939accda225b8e8b6bde79700d3c11faa4&ipo=images', // Replace with actual Imgur URL
      description: 'Intense Syrah with aromas of dark fruits and spices. This wine offers a robust structure with well-integrated tannins and a persistent finish. Ideal for pairing with grilled meats and aged cheeses.',
    },
    {
      id: 4,
      name: 'Sauvignon Blanc',
      year: 2021,
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.asherbws.com%2Fwp-content%2Fuploads%2F2013%2F12%2FBrancott-Estate-Marlborough-Sauvignon-Blanc13900403159901.jpg&f=1&nofb=1&ipt=56b99d75382ed7548190d6945414248c588ce726821251297138059b492d9d83&ipo=images', // Replace with actual Imgur URL
      description: 'Fresh and vibrant Sauvignon Blanc with notes of citrus and herbs. Its lively acidity and fruity profile make it perfect for enjoying with salads and seafood.',
    },
    // Add more wines if needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {wines.map((wine) => (
        <View key={wine.id} style={styles.wineCard}>
          <Text style={styles.wineName}>{wine.name}</Text>
          <Image source={{ uri: wine.imageUrl }} style={styles.wineImage} />
          <Text style={styles.wineDescription}>{wine.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
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
    width: '100%', // Ensures card takes full width
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
    height: 300,
    aspectRatio: 3/2, // Maintain aspect ratio
    borderRadius: 10,
    marginBottom: 10,
  },
  wineDescription: {
    fontSize: 15,
    color: '#333', // Darker color for better readability
    fontWeight: 'bold',
    lineHeight: 20,
    textAlign: 'center', // Centers the text
  },
});

export default ForYou;

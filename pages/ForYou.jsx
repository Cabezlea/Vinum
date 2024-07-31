import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// Example wine data with additional properties for filtering
const allWines = [
  {
    id: 1,
    name: 'Malbec Reserva',
    year: 2019,
    imageUrl: 'https://media.nicks.com.au/products/86cd57ba/terrazas-reserva-malbec.jpg',
    description: 'Elegant Malbec with notes of black fruits and vanilla. It features a robust body and smooth tannins, perfect with red meats and spiced dishes. Oak barrel aging adds complexity with a long, persistent finish.',
    type: 'Red',
    country: 'Argentina',
    grape: 'Malbec',
    region: 'Mendoza',
  },
  {
    id: 2,
    name: 'Chardonnay Gran Reserva',
    year: 2020,
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lJGLM4mQWIjYGggHC7dznwHaJ4%26pid%3DApi&f=1&ipt=6fb16f0604e766e7ebbf85dcf5935e7fa54567cfdfa30792e71c23703283b209&ipo=images',
    description: 'Full-bodied Chardonnay with tropical fruit aromas. Notes of pineapple, mango, and a hint of butter from barrel aging. Its balanced acidity and creamy texture make it perfect for pairing with rich sauces and fatty fish.',
    type: 'White',
    country: 'Chile',
    grape: 'Chardonnay',
    region: 'Central Valley',
  },
  {
    id: 3,
    name: 'Syrah Reserva',
    year: 2018,
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatics.angeloni.com.br%2Fsuper%2Ffiles%2Fprodutos%2F3782590%2F3782590_1_zoom.jpg&f=1&nofb=1&ipt=fd08cca0a9f8be55ad8bfc2b616a41939accda225b8e8b6bde79700d3c11faa4&ipo=images',
    description: 'Intense Syrah with dark fruit and spice aromas. Offers a robust structure with well-integrated tannins and a persistent finish. Ideal with grilled meats and aged cheeses.',
    type: 'Red',
    country: 'South Africa',
    grape: 'Syrah',
    region: 'Western Cape',
  },
  {
    id: 4,
    name: 'Sauvignon Blanc',
    year: 2021,
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.asherbws.com%2Fwp-content%2Fuploads%2F2013%2F12%2FBrancott-Estate-Marlborough-Sauvignon-Blanc13900403159901.jpg&f=1&nofb=1&ipt=56b99d75382ed7548190d6945414248c588ce726821251297138059b492d9d83&ipo=images',
    description: 'Fresh and vibrant Sauvignon Blanc with citrus and herbal notes. Its lively acidity and fruity profile make it perfect with salads and seafood.',
    type: 'White',
    country: 'New Zealand',
    grape: 'Sauvignon Blanc',
    region: 'Marlborough',
  },
  // Add more wines if needed
];

const ForYou = ({ filters = {} }) => {
  // Filter wines based on the selected filters
  const filteredWines = allWines.filter((wine) => {
    return (
      (!filters.type || wine.type === filters.type) &&
      (!filters.country || wine.country === filters.country) &&
      (!filters.grape || wine.grape === filters.grape) &&
      (!filters.region || wine.region === filters.region)
    );
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filteredWines.length > 0 ? (
        filteredWines.map((wine) => (
          <View key={wine.id} style={styles.wineCard}>
            <Text style={styles.wineName}>{wine.name}</Text>
            <Image source={{ uri: wine.imageUrl }} style={styles.wineImage} />
            <Text style={styles.wineDescription}>{wine.description}</Text>
            <Text style={styles.wineDetails}>Type: {wine.type}</Text>
            <Text style={styles.wineDetails}>Country: {wine.country}</Text>
            <Text style={styles.wineDetails}>Grape: {wine.grape}</Text>
            <Text style={styles.wineDetails}>Region: {wine.region}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>No wines match your filters.</Text>
      )}
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
    aspectRatio: 3 / 2, // Maintain aspect ratio
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
  wineDetails: {
    fontSize: 14,
    color: '#666', // Slightly lighter color for details
    marginVertical: 2,
  },
  noResults: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ForYou;

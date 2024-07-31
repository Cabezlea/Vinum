import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const WineDetailScreen = ({ route }) => {
  const { wine } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: wine.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{wine.name} ({wine.year})</Text>
        <Text style={styles.description}>{wine.description}</Text>
        <Text style={styles.detailsText}>Type: {wine.type}</Text>
        <Text style={styles.detailsText}>Country: {wine.country}</Text>
        <Text style={styles.detailsText}>Grape: {wine.grape}</Text>
        <Text style={styles.detailsText}>Region: {wine.region}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 14,
    marginVertical: 2,
    color: '#666',
  },
});

export default WineDetailScreen;

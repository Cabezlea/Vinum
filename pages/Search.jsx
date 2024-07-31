import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'; // Import ScrollView from gesture handler

const categories = [
  {
    title: 'Search Wines by Type',
    data: ['Red', 'White', 'Sparkling', 'Rosé', 'Dessert'],
    key: 'type',
  },
  {
    title: 'Search by Country',
    data: ['France', 'Italy', 'Spain', 'USA', 'Australia'],
    key: 'country',
  },
  {
    title: 'Search by Grape',
    data: ['Cabernet Sauvignon', 'Merlot', 'Chardonnay', 'Pinot Noir', 'Sauvignon Blanc'],
    key: 'grape',
  },
  {
    title: 'Search by Region',
    data: ['Bordeaux', 'Tuscany', 'Napa Valley', 'Champagne', 'Barossa Valley'],
    key: 'region',
  },
];

const CategoryCard = ({ title, data, keyProp, onFilterSelect }) => (
  <View style={styles.card}>
    <Text style={styles.categoryTitle}>{title}</Text>
    <View style={styles.itemsContainer}>
      {data.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.itemContainer}
          onPress={() => onFilterSelect(keyProp, item)}
        >
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const SearchPage = ({ onFilterSelect }) => {
  // State to manage selected filters
  const [selectedFilters, setSelectedFilters] = useState({});

  // Function to handle filter selection
  const handleFilterSelect = (key, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    // Call the passed down onFilterSelect function
    if (onFilterSelect) {
      onFilterSelect({ ...selectedFilters, [key]: value });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          title={category.title}
          data={category.data}
          keyProp={category.key}
          onFilterSelect={handleFilterSelect}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: Dimensions.get('window').width - 40, // Adjust width as needed
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SearchPage;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

const Questions = () => {
  const [wineType, setWineType] = useState(null);
  const [sweetness, setSweetness] = useState(null);
  const [accompaniment, setAccompaniment] = useState(null);
  const [priceRange, setPriceRange] = useState([20, 50]); // Default range

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Customize your wine preferences</Text>

      {/* Wine Type Selection */}
      <View style={styles.section}>
        <Text style={styles.questionText}>What type of wine do you like?</Text>
        <View style={styles.buttonContainer}>
          {['Red', 'White', 'Rosé'].map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.button, wineType === type && styles.buttonSelected]}
              onPress={() => setWineType(type)}
            >
              <Text style={styles.buttonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sweetness Level Selection */}
      <View style={styles.section}>
        <Text style={styles.questionText}>What's your preferred sweetness level?</Text>
        <View style={styles.buttonContainer}>
          {['Dry', 'Medium Dry', 'Medium Sweet', 'Sweet'].map(level => (
            <TouchableOpacity
              key={level}
              style={[styles.button, sweetness === level && styles.buttonSelected]}
              onPress={() => setSweetness(level)}
            >
              <Text style={styles.buttonText}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Accompaniment Selection */}
      <View style={styles.section}>
        <Text style={styles.questionText}>How do you like to accompany your wine?</Text>
        <View style={styles.buttonContainer}>
          {['Steak', 'Pork', 'Fish', 'Poultry'].map(food => (
            <TouchableOpacity
              key={food}
              style={[styles.button, accompaniment === food && styles.buttonSelected]}
              onPress={() => setAccompaniment(food)}
            >
              <Text style={styles.buttonText}>{food}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Price Range Selection */}
      <View style={styles.section}>
        <Text style={styles.questionText}>What is your price range?</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#D52247"
          maximumTrackTintColor="#FFFFFF"
          step={1}
          value={priceRange[0]} // Assuming priceRange is now a single value or handle initial values correctly if using a range
          onValueChange={value => setPriceRange([value, priceRange[1]])} // Adjust based on how you handle state
        />
        <Text style={styles.rangeText}>From ${priceRange[0]} To ${priceRange[1]}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0D1B2A',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#073152',
    padding: 10,
    borderRadius: 20,
  },
  buttonSelected: {
    backgroundColor: '#D52247',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  section: {
    marginBottom: 30,
  },
});

export default Questions;

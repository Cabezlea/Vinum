import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Questions = () => {
  const [wineType, setWineType] = useState(null);
  const [sweetness, setSweetness] = useState(null);
  const [accompaniment, setAccompaniment] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 50]); // Range starts from 0

  return (
    <View style={styles.container}>
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
      {wineType && (
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
      )}

      {/* Accompaniment Selection */}
      {sweetness && (
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
      )}

      {/* Price Range Selection */}
      {accompaniment && (
        <View style={styles.section}>
          <Text style={styles.questionText}>What is your price range?</Text>
          <MultiSlider
            values={priceRange}
            sliderLength={280} // Adjust width to full width if needed
            onValuesChange={(values) => setPriceRange(values)}
            min={0}
            max={50}
            step={1}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={30}
          />
          <Text style={styles.rangeText}>From ${priceRange[0]} To ${priceRange[1]}</Text>
        </View>
      )}

      {/* Continue Button */}
      {priceRange && (
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 85, // Increased top padding
    backgroundColor: '#0D1B2A',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
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
    width: '100%', // Ensure the slider is full width
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
  continueButton: {
    backgroundColor: '#D52247',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Questions;

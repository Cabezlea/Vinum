import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Questions = () => {
  const [wineType, setWineType] = useState(null);
  const [sweetness, setSweetness] = useState(null);
  const [accompaniment, setAccompaniment] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 50]);  // Corrected to 0-50

  // States to manage animations
  const [fadeAnim] = useState(new Animated.Value(0));

  // Function to handle smooth appearance of options
  const fadeInNextSection = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Customize your wine preferences</Text>

      <View style={styles.section}>
        <Text style={styles.questionText}>What type of wine do you like?</Text>
        <View style={styles.buttonContainer}>
          {['Red', 'White', 'Rosé'].map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.button, wineType === type && styles.buttonSelected]}
              onPress={() => {
                setWineType(type);
                fadeInNextSection();
                if (!sweetness) setSweetness(null);
              }}
            >
              <Text style={styles.buttonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {wineType && (
        <Animated.View style={[styles.section, {opacity: fadeAnim}]}>
          <Text style={styles.questionText}>What's your preferred sweetness level?</Text>
          <View style={styles.buttonContainer}>
            {['Dry', 'Medium Dry', 'Medium Sweet', 'Sweet'].map(level => (
              <TouchableOpacity
                key={level}
                style={[styles.button, sweetness === level && styles.buttonSelected]}
                onPress={() => {
                  setSweetness(level);
                  fadeInNextSection();
                  if (!accompaniment) setAccompaniment(null);
                }}
              >
                <Text style={styles.buttonText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}

      {sweetness && (
        <Animated.View style={[styles.section, {opacity: fadeAnim}]}>
          <Text style={styles.questionText}>How do you like to accompany your wine?</Text>
          <View style={styles.buttonContainer}>
            {['Steak', 'Pork', 'Fish', 'Poultry'].map(food => (
              <TouchableOpacity
                key={food}
                style={[styles.button, accompaniment === food && styles.buttonSelected]}
                onPress={() => {
                  setAccompaniment(food);
                  fadeInNextSection();
                  if (!priceRange) setPriceRange([0, 50]);
                }}
              >
                <Text style={styles.buttonText}>{food}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}

      {accompaniment && (
        <Animated.View style={[styles.section, {opacity: fadeAnim}]}>
          <Text style={styles.questionText}>What is your price range?</Text>
          <MultiSlider
            values={priceRange}
            sliderLength={280} // Ensure the slider fits within the screen width
            onValuesChange={setPriceRange}
            min={0}
            max={50}
            step={1}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={10}
          />
          <Text style={styles.rangeText}>From ${priceRange[0]} To ${priceRange[1]}</Text>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60, // Increased padding at the top
    backgroundColor: '#0D1B2A',
  },
  headerText: {
    fontSize: 24, // Slightly larger for emphasis
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30, // Increased bottom margin for spacing
    textAlign: 'center',
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 15, // Increased spacing
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Improved spacing between buttons
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#073152',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100, // Ensured minimum width for aesthetic consistency
  },
  buttonSelected: {
    backgroundColor: '#D52247',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  slider: {
    alignSelf: 'center',
    width: '90%', // Reduced width to ensure it doesn't exceed screen bounds
  },
  rangeText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#D52247',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Questions;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation, CommonActions } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Questions = () => {
  const navigation = useNavigation();

  const [wineType, setWineType] = useState(null);
  const [sweetness, setSweetness] = useState(null);
  const [accompaniment, setAccompaniment] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 50]);

  const handleContinue = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainDrawer',
            state: {
              routes: [{ name: 'ForYou' }],
            },
          },
        ],
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Customize your wine preferences</Text>

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

      {accompaniment && (
        <View style={styles.section}>
          <Text style={styles.questionText}>What is your price range?</Text>
          <MultiSlider
            values={priceRange}
            sliderLength={280}
            onValuesChange={setPriceRange}
            min={0}
            max={50}
            step={1}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={10}
            containerStyle={{ alignSelf: 'center' }}
          />
          <Text style={styles.rangeText}>From ${priceRange[0]} To ${priceRange[1]}</Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#0D1B2A',
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 19,
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#073152',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 60,
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
    width: '100%',
  },
  rangeText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#D52247',
    padding: 15,
    borderRadius: 25,
    width: width * 0.8,
    alignSelf: 'center',
    marginTop: 30,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Questions;

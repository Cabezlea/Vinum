import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Welcome = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the questions page after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Questions'); // Replace 'Questions' with the actual route name of your questions page
    }, 3000);

    // Cleanup function to clear the timer when the component is unmounted
    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <Image source={require('../images/Vinum.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome To Vinum</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#091521', // Static background color
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Ensures the background view fills the entire screen
    backgroundColor: '#091521', // Set the background color
  },
  logo: {
    width: 200, // Adjust based on your logo's aspect ratio
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Text color for better contrast on a dark background
  },
});

export default Welcome;

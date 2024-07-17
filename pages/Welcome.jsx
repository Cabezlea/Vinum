import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const Welcome = ({ navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: false // It's important to set to false since we're animating non-numeric styles (backgroundColor)
        }),
        { iterations: -1 }
      ).start();
    };

    startAnimation();

    // Navigate to the questions page after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Questions'); // Replace 'Questions' with the actual route name of your questions page
    }, 3000);

    // Cleanup function to stop the animation and clear the timer when the component is unmounted
    return () => {
      animatedValue.stopAnimation();
      clearTimeout(timer);
    };
  }, [navigation]);

  // Interpolating background color to animate between different shades of blue
  const backgroundInterpolate = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#0D1B2A', '#073152', '#0D1B2A'] // Dark blue shades
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, { backgroundColor: backgroundInterpolate }]} />
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
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Ensures the animated view fills the entire screen
  },
  logo: {
    width: 120, // Adjust based on your logo's aspect ratio
    height: 120,
    marginBottom: 20,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF' // Text color for better contrast on a dark background
  },
});

export default Welcome;

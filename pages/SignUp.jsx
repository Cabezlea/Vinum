import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Image } from "react-native";

const SignUp = ({ navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: false, // Ensure this is false as we are animating colors
        }),
        { iterations: -1 }
      ).start();
    };

    startAnimation();

    // Cleanup to stop animation when component unmounts
    return () => animatedValue.stopAnimation();
  }, []);

  const backgroundInterpolate = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#8C001A', '#46000D', '#8C001A'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, { backgroundColor: backgroundInterpolate }]} />
      <Text style={styles.welcomeText}>Sign Up With Email</Text>
      <View style={styles.inputContainer}>
        <Image source={require('../images/user.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#FFFFFF"
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../images/user.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          underlineColorAndroid="transparent"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../images/password.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          underlineColorAndroid="transparent"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../images/password.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#FFFFFF"
          underlineColorAndroid="transparent"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ForYou')} // Adjust navigation as needed
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D1B2A', // Ensuring consistency with the SignIn screen
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#F7E1D7',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#F7E1D7',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F7E1D7',
    marginBottom: 25,
    width: '80%',
  },
  input: {
    color: '#F7E1D7',
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  button: {
    width: '80%',
    backgroundColor: '#D52247',
    padding: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#F7E1D7',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUp;

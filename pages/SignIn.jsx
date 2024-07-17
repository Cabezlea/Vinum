import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import facebookIcon from '../images/facebook.png';
import googleIcon from '../images/google.png';

const { height } = Dimensions.get('window');

const SignInScreen = ({ onSignIn, navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    ).start();
  };

  const backgroundInterpolate = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#8C001A', '#46000D', '#8C001A'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, { backgroundColor: backgroundInterpolate }]} />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome To Vinum</Text>
        <View style={styles.inputContainer}>
          <Image source={require('../images/user.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            underlineColorAndroid="transparent"
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFacebook} onPress={() => {}}>
          <Image source={facebookIcon} style={styles.socialIcon} />
          <Text style={[styles.buttonText, styles.buttonTextWithIcon]}>Log in with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGoogle} onPress={() => {}}>
          <Image source={googleIcon} style={styles.socialIcon} />
          <Text style={[styles.buttonText, styles.buttonTextWithIcon]}>Log in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
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
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#F7E1D7',
  },
  button: {
    width: '80%',
    backgroundColor: '#D52247',
    padding: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#F7E1D7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonFacebook: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B5998',
    width: '80%',
    padding: 12,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DB4437',
    width: '80%',
    padding: 12,
    borderRadius: 25,
    marginBottom: 15,
  },
  signUpButton: {
    width: '80%',
    backgroundColor: '#D52247',
    padding: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 30,
  },
  signUpText: {
    color: '#F7E1D7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 12,
    tintColor: '#F7E1D7',
  },
});

export default SignInScreen;

import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';

const {height} = Dimensions.get('window');
const SignInScreen = ({ onSignIn }) => {
  return (
    <View style={styles.container}>
      {/* Text Input from the user */}
      <Text style={styles.welcomeText}>Welcome To Vinum</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#FFFFFF"/>
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#FFFFFF"/>
      {/* Buttons for the user to Sign in */}
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or</Text>

      <TouchableOpacity style={styles.buttonFacebook} onPress={() => {}}>
        <Text style={styles.buttonText}>Log in with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonGoogle} onPress={() => {}}>
        <Text style={styles.buttonText}>Log in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={() => {}}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0D1B2A',
    paddingTop: height * 0.1,

  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFFFFF',
  },
  input: {
    color: '#FFFFFF',
    width: '90%',
    height: 40,
    backgroundColor: '#ffffff40',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  button: {
    width: '90%',
    backgroundColor: '#4666F2', // Example color
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  orText: {
    color: '#FFFFFF',
    marginBottom: 20,
  },
  buttonFacebook: {
    backgroundColor: '#3B5998', // Facebook blue
    width: '90%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 25,
  },
  buttonGoogle: {
    backgroundColor: '#DB4437', // Google red
    width: '90%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  signUpButton: {
    marginTop: 15,
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16,
  }
});

export default SignInScreen;

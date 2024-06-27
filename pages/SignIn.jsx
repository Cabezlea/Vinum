import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Dimensions } from 'react-native';

const {height} = Dimensions.get('window');
const SignInScreen = ({ onSignIn }) => {
  return (
    <View style={styles.container}>
      {/* Text Input from the user */}
      <Text style={styles.welcomeText}>Welcome To Vinum</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#FFFFFF"/>
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#FFFFFF"/>
      {/* Buttons for the user to Sign in */}
      <Button title="Sign In" onPress={onSignIn} color="#FFFFFF" />
      <Text style={styles.orText}>or</Text>
      <Button title="Log in with Facebook" onPress={() => {}} color="#FFFFFF" />
      <Button title="Log in with Google" onPress={() => {}} color="#FFFFFF" />
      <Button title="Sign Up" onPress={() => {}} color="#FFFFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0D1B2A',
    paddingTop: height * 0.13, // 13% of the screen to make sure it is responsive
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20, // Add some space before the button
    color: '#FFFFFF',
  },
  input: {
    color: '#FFFFFF',
    width: '90%',
    height: 40,
    backgroundColor: '#ffffff40',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  orText: {
    color: '#FFFFFF',
    marginVertical: 10,
  },
  signUpText: {
    marginTop: 20,
    color: '#FFF',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#5C4D7D',
  }
});

export default SignInScreen;

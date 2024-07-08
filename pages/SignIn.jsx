import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';

const { height } = Dimensions.get('window');

const SignInScreen = ({ onSignIn }) => {
  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 25,
    width: '80%', // Reduced from 90% to 80%
  },
  input: {
    color: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  button: {
    width: '80%', // Reduced from 90% to 80%
    backgroundColor: '#4666F2',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  orText: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  buttonFacebook: {
    backgroundColor: '#3B5998',
    width: '80%', // Reduced from 90% to 80%
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonGoogle: {
    backgroundColor: '#DB4437',
    width: '80%', // Reduced from 90% to 80%
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 1,
  },
  signUpButton: {
    width: '80%', // Reduced from 90% to 80%
    backgroundColor: '#4666F2',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SignInScreen;

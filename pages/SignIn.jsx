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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 25,
    width: '90%',
  },
  input: {
    color: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  icon: {
    width: 24,  // Set width of the icon
    height: 24, // Set height of the icon
    marginRight: 10, // Adds spacing between the icon and the input field
  },
  button: {
    width: '90%',
    backgroundColor: '#4666F2',
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
    backgroundColor: '#3B5998',
    width: '90%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 25,
  },
  buttonGoogle: {
    backgroundColor: '#DB4437',
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
  },
});

export default SignInScreen;

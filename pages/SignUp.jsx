import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
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
        onPress={() => navigation.navigate('Welcome')}
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
    backgroundColor: '#0D1B2A', // Dark blue background color
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D1B2A', // Static background color
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
  linkText: {
    color: '#F7E1D7',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
  },
});

export default SignUp;

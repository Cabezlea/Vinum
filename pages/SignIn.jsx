import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';

const {height} = Dimensions.get('window');
const SignInScreen = ({ onSignIn }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the App Norero</Text>
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0e5de',
    paddingTop: height * 0.13, // 13% of the screen to make sure it is responsive
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20, // Add some space before the button
  },
});

export default SignInScreen;

import React from 'react';
import { View, Text, Button } from 'react-native';

const SignInScreen = ({ onSignIn }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the App Norero</Text>
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
};

export default SignInScreen;

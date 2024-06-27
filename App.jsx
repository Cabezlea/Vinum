// En App.js o en tu archivo de navegación principal
import * as React from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignInScreen from './pages/SignIn';
import ForYouScreen from './pages/ForYou';
import ProfileScreen from './pages/Profile';
import SearchScreen from './pages/Search';
import CollectionsScreen from './pages/Collections';
import {useState} from "react";

enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="For You" component={ForYouScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Collections" component={CollectionsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <MainTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn">
            {props => <SignInScreen {...props} onSignIn={() => setIsSignedIn(true)} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;

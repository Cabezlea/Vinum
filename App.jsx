import * as React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './pages/SignIn';
import ForYouScreen from './pages/ForYou';
import ProfileScreen from './pages/Profile';
import SearchScreen from './pages/Search';
import CollectionsScreen from './pages/Collections';
import { useState } from 'react';
import { Image } from 'react-native';


enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: '#f20d5d',
        },
        tabBarLabelStyle: {
          fontSize: 13, // Change this value to make the font larger
          fontWeight: 'bold', // Make the font bold
        },
      }}
    >
      <Tab.Screen
        name="For You"
        component={ForYouScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('./images/foryou.png')
                  : require('./images/foryou.png')
              }
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('./images/search.png')
                  : require('./images/search.png')
              }
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Collections"
        component={CollectionsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('./images/wine.png')
                  : require('./images/wine.png')
              }
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('./images/profile.png')
                  : require('./images/profile.png')
              }
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
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

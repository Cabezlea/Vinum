import * as React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import SignInScreen from './pages/SignIn';
import ForYouScreen from './pages/ForYou';
import ProfileScreen from './pages/Profile';
import SearchScreen from './pages/Search';
import CollectionsScreen from './pages/Collections';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import Questions from './pages/Questions';
import WineDetailScreen from './pages/WineDetails'; // Import the WineDetailScreen
import { useState } from 'react';

enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case 'For You':
              iconName = require('./images/foryou.png');
              break;
            case 'Search':
              iconName = require('./images/search.png');
              break;
            case 'Collections':
              iconName = require('./images/wine.png');
              break;
            case 'Profile':
              iconName = require('./images/profile.png');
              break;
          }

          return (
            <Image
              source={iconName}
              style={[
                styles.icon,
                { opacity: focused ? 1 : 0.5 },
                focused && styles.focusedIcon,
              ]}
            />
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#c7c2c2d9',
        tabBarStyle: {
          backgroundColor: '#001C2B',
        },
        tabBarLabelStyle: {
          fontSize: 13, // Change this value to make the font larger
          fontWeight: 'bold', // Make the font bold
        },
        headerShown: false, // Hide the header in the Tab.Navigator
      })}
    >
      <Tab.Screen name="For You" component={ForYouScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Collections" component={CollectionsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function CustomHeaderTitle() {
  return (
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerTitle}>Vinum</Text>
    </View>
  );
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerTitle: () => <CustomHeaderTitle />,
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Image
                  source={require('./images/cart.png')}
                  style={styles.cartIcon}
                />
              </TouchableOpacity>
            ),
          }}
        >
          <Stack.Screen name="Vinum" component={MainTabs} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn">
            {props => <SignInScreen {...props} onSignIn={() => setIsSignedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Questions">
            {props => (
              <Questions
                {...props}
                onSignIn={(filters) => {
                  setIsSignedIn(true);
                  // The filters will be available in ForYou screen
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="WineDetails" component={WineDetailScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  focusedIcon: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cartIcon: {
    width: 25,
    height: 25,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

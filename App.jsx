import * as React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import SignInScreen from './pages/SignIn';
import ForYouScreen from './pages/ForYou';
import Profile from './pages/Profile';
import SearchScreen from './pages/Search';
import CollectionsScreen from './pages/Collections';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import Questions from './pages/Questions';
import WineDetailScreen from './pages/WineDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { useState } from 'react';

enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ setIsSignedIn }) {
  return (
    <View style={styles.tabContainer}>
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
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
          },
          headerShown: false,
        })}
      >
        {/* For You Screen */}
        <Tab.Screen
          name="For You"
          component={ForYouScreen}
          options={{
            contentStyle: {
              paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
            },
          }}
        />

        {/* Search Screen */}
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            contentStyle: {
              paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
            },
          }}
        />

        {/* Collections Screen (no padding or SafeAreaView) */}
        <Tab.Screen
          name="Collections"
          component={CollectionsScreen}
          options={{
            contentStyle: { paddingTop: 0 },
          }}
        />

        {/* Profile Screen */}
        <Tab.Screen name="Profile">
          {props => <Profile {...props} onSignOut={() => setIsSignedIn(false)} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0D1B2A" translucent={true} />
      {isSignedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0D1B2A' },
          }}
        >
          <Stack.Screen name="Vinum">
            {props => <MainTabs {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>
          <Stack.Screen name="WineDetails" component={WineDetailScreen} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Orders" component={Orders} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0D1B2A' },
          }}
        >
          <Stack.Screen name="SignIn">
            {props => <SignInScreen {...props} onSignIn={() => setIsSignedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Questions">
            {props => (
              <Questions
                {...props}
                onSignIn={() => setIsSignedIn(true)}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
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

export default App;

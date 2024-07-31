import * as React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import SignInScreen from './pages/SignIn';
import ForYouScreen from './pages/ForYou';
import ProfileScreen from './pages/Profile';
import SearchScreen from './pages/Search';
import CollectionsScreen from './pages/Collections';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import Questions from './pages/Questions';

enableScreens();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
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
      <Drawer.Screen name="ForYou" component={ForYouScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Collections" component={CollectionsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen
            name="MainDrawer"
            component={MainDrawer}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="SignIn">
              {props => <SignInScreen {...props} onSignIn={() => setIsSignedIn(true)} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Questions" component={Questions} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
});

export default App;

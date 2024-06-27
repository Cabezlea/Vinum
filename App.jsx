// En App.js o en tu archivo de navegación principal
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ForYouScreen from './pages/ForYou';
import ProfileScreen from './pages/Profile';
import SearchScreen from './pages/Search';
import CollectionsScreen from './pages/Collections';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="For You" component={ForYouScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Collections" component={CollectionsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

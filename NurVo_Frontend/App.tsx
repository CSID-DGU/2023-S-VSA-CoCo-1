/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from './src/utilities/Color';
import Home from './src/pages/Home';

const Tab = createBottomTabNavigator();
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Library') {
            iconName = focused ? 'folder' : 'folder';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.MAINGREEN,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Library" component={LibraryStackScreen} />
    </Tab.Navigator>
  );
}



const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: Colors.BLACK,
        headerBackTitleVisible: false,
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const LibraryStack = createNativeStackNavigator();
const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerTintColor: Colors.BLACK,
        headerBackTitleVisible: false,
      }}
    >
      <LibraryStack.Screen name="LibraryScreen" component={Library} options={{ headerShown: false }} />
    </LibraryStack.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

const Library = () => {
  return (
    <SafeAreaView>
      <Text>Library!</Text>
    </SafeAreaView>
  )
};

export default App;

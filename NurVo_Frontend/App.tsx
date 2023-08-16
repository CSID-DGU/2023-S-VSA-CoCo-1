/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from './src/utilities/Color';
import StudyPageInfor from './src/utilities/Infor.mjs';
import LibraryHeader from './src/components/LibraryHeader';
import Home from './src/pages/Home';
import LessonsList from './src/pages/LessonsList';
import LessonFirst from './src/pages/ChapterStudy/LessonFirst';
import LessonSecond from './src/pages/ChapterStudy/LessonSecond';
import LessonThird from './src/pages/ChapterStudy/LessonThird';
import Bookmark from './src/pages/Bookmark';
import StudyPage from './src/pages/StudyPage';
import MemberDetails from './src/pages/MemberDetails';
import SetUserGoal from './src/pages/SetUserGoal';
import { HomeStackParamList } from './src/utilities/NavigationTypes';

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
      <Tab.Screen name="Library" component={LibraryStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}



const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: Colors.BLACK,
        headerBackTitleVisible: false,
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="LessonList" component={LessonsList} />
      <HomeStack.Screen name="LessonFirstScreen" component={LessonFirst} />
      <HomeStack.Screen name="LessonSecondScreen" component={LessonSecond} />
      <HomeStack.Screen name="LessonThirdScreen" component={LessonThird} />
      <HomeStack.Screen name="MemberDetails" component={MemberDetails} />
      <HomeStack.Screen name="SetUserGoal" component={SetUserGoal} />
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
      <LibraryStack.Screen name="Library" component={Bookmark}
        options={{
          header: ({ scene }) => {
            return <LibraryHeader title='Library' isDelete={true} />;
          },
        }} />
      <LibraryStack.Screen name="StudyPage" component={StudyPage}
        options={{
          header: ({ scene }) => {
            return <LibraryHeader title='StudyPage' image={StudyPageInfor} isBack={true} />;
          },
        }} />
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

export default App;

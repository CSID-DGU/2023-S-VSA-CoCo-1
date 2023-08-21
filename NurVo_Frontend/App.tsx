/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useLayoutEffect, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from './src/utilities/Color';
import StudyPageInfor from './src/utilities/Infor.mjs';
import Home from './src/pages/Home';
import LessonsList from './src/pages/LessonsList';
import LessonFirst from './src/pages/ChapterStudy/LessonFirst';
import LessonSecond from './src/pages/ChapterStudy/LessonSecond';
import LessonThird from './src/pages/ChapterStudy/LessonThird';
import Bookmark from './src/pages/Bookmark';
import StudyPage from './src/pages/StudyPage';
import MemberDetails from './src/pages/MemberDetails';
import SetUserGoal from './src/pages/SetUserGoal';
import MainPage from './src/pages/MainPage';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import HeaderButton from './src/components/HeaderButton';
import { ChapterStackParamList, HomeStackParamList, MainStackParamList, RootStackParamList } from './src/utilities/NavigationTypes';
import AllLessonsList from './src/pages/AllLessonsList';

const Tab = createBottomTabNavigator<RootStackParamList>();
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = route.name.toLowerCase();

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Chapter') {
            iconName = 'book';
          } else if (route.name === 'Library') {
            iconName = 'folder';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.MAINGREEN,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chapter" component={ChapterStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Library" component={LibraryStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeStackScreen = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'LessonFirstScreen' || routeName === 'LessonSecondScreen' || routeName === 'LessonThirdScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: undefined } });
    }
  })
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

const LibraryStack = createNativeStackNavigator<LibraryStackParamList>();
const LibraryStackScreen = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'StudyPage') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: undefined } });
    }
  });

  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerTintColor: Colors.BLACK,
        headerBackTitleVisible: false,
      }}
    >
      <LibraryStack.Screen name="Library" component={Bookmark} />
      <LibraryStack.Screen name="StudyPage" component={StudyPage}
        options={{
          headerRight: () => (
            <HeaderButton types='useInfor' image={StudyPageInfor} />
          ),
        }} />
    </LibraryStack.Navigator>
  );
}

const ChapterStack = createNativeStackNavigator<ChapterStackParamList>();
const ChapterStackScreen = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'LessonFirstScreen' || routeName === 'LessonSecondScreen' || routeName === 'LessonThirdScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: undefined } });
    }
  })
  return (
    <ChapterStack.Navigator
      screenOptions={{
        headerTintColor: Colors.BLACK,
        headerBackTitleVisible: false,
      }}
    >
      <ChapterStack.Screen name="AllLessonsList" component={AllLessonsList} />
      <ChapterStack.Screen name="LessonFirstScreen" component={LessonFirst} />
      <ChapterStack.Screen name="LessonSecondScreen" component={LessonSecond} />
      <ChapterStack.Screen name="LessonThirdScreen" component={LessonThird} />
    </ChapterStack.Navigator>
  );
}

function AutoBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = route.name.toLowerCase();

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Chapter') {
            iconName = 'book';
          } else if (route.name === 'Library') {
            iconName = 'folder';
          } else if (route.name === 'Main') {
            return null; // MainStack 탭의 아이콘을 만들지 않음
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.MAINGREEN,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chapter" component={ChapterStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Library" component={LibraryStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const MainStack = createNativeStackNavigator<MainStackParamList>();
const MainStackScreen = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const shouldHideTabBar =
      routeName === 'MainPage' ||
      routeName === 'Login' ||
      routeName === 'SignUp' ||
      routeName === 'SetUserGoalinital';

    navigation.setOptions({ tabBarStyle: { display: shouldHideTabBar ? 'none' : undefined } });

    // 컴포넌트가 언마운트될 때 탭바를 다시 보이도록 설정
    return () => {
      navigation.setOptions({ tabBarStyle: { display: undefined } });
    };
  });

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: Colors.BLACK,
        headerBackTitleVisible: false,
      }}
    >
      <MainStack.Screen name="MainPage" component={MainPage} />
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="SignUp" component={SignUp} />
    </MainStack.Navigator>
  );
}

function App(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [initialRoute, setInitialRoute] = useState('MainStackScreen');

  // 계속 로그인
  // const [initialRoute, setInitialRoute] = useState('Home');

  // useEffect(() => {
  //   const checkTokenAndSetInitialRoute = async () => {
  //     try {
  //       const accessToken = await EncryptedStorage.getItem('accessToken');

  //       if (accessToken) {
  //         setInitialRoute('Home');
  //       } 
  //     } catch (error) {
  //       // 에러 메세지
  //     }
  //   };

  //   checkTokenAndSetInitialRoute();
  // }, [initialRoute]);

  return (
    <NavigationContainer>
      {isLogin ? <BottomTabs /> : <MainStackScreen />}
    </NavigationContainer>
  );
};

export default App;
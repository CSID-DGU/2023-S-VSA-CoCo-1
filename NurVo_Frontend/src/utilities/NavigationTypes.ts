import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  Chapter: undefined;
  Main: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  LessonList: undefined;
  LessonFirstScreen: { chapterId: number };
  LessonSecondScreen: { chapterId: number };
  LessonThirdScreen: { chapterId: number };
  MemberDetails: undefined;
  SetUserGoal: undefined;
}
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;
export interface HomeStackScreenProps {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  route: RouteProp<HomeStackParamList, 'HomeScreen'>;
}

export type ChapterStackParamList = {
  LessonList: undefined;
  LessonFirstScreen: { chapterId: number };
  LessonSecondScreen: { chapterId: number };
  LessonThirdScreen: { chapterId: number };
}
export type ChapterScreenNavigationProp = NativeStackNavigationProp<
ChapterStackParamList,
  'LessonList'
>;
export interface ChapterStackScreenProps {
  navigation: NativeStackNavigationProp<ChapterStackParamList, 'LessonList'>;
  route: RouteProp<HomeStackParamList, 'LessonList'>;
}

//LessonFirstScreen
type LessonFirstScreenRouteProp = RouteProp<HomeStackParamList, 'LessonFirstScreen'>;
type LessonFirstScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'LessonFirstScreen'
>;
export interface LessonFirstProps {
  navigation: LessonFirstScreenNavigationProp;
  route: LessonFirstScreenRouteProp;
}

//LessonSecondScreen
type LessonSecondScreenRouteProp = RouteProp<HomeStackParamList, 'LessonSecondScreen'>;
type LessonSecondScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'LessonSecondScreen'
>;
export interface LessonSecondProps {
  navigation: LessonSecondScreenNavigationProp;
  route: LessonSecondScreenRouteProp;
}

//LessonThirdScreen
type LessonThirdScreenRouteProp = RouteProp<HomeStackParamList, 'LessonThirdScreen'>;
type LessonThirdScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'LessonThirdScreen'
>;
export interface LessonThirdProps {
  navigation: LessonThirdScreenNavigationProp;
  route: LessonThirdScreenRouteProp;
}

export type MainStackParamList = {
  MainScreen: undefined;
  Login: undefined;
  SignUp: undefined;
}
export type MainScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'MainScreen'
>;
export interface MainStackScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamList, 'MainScreen'>;
  route: RouteProp<MainStackParamList, 'MainScreen'>;
}
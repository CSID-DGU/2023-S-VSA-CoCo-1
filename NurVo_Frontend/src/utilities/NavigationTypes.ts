import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Library: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  LessonList: undefined;
  LessonFirstScreen: { chapterId: number };
  LessonSecondScreen: { chapterId: number };
  LessonThirdScreen: { chapterId: number };
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

type LessonFirstScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'LessonFirstScreen'
>;
type LessonSecondScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'LessonSecondScreen'
>;

type LessonFirstScreenRouteProp = RouteProp<HomeStackParamList, 'LessonFirstScreen'>;

type LessonSecondScreenRouteProp = RouteProp<HomeStackParamList, 'LessonSecondScreen'>;

export interface HomeStackScreenProps {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  route: RouteProp<HomeStackParamList, 'HomeScreen'>;
}

export interface LessonFirstProps {
  navigation: LessonFirstScreenNavigationProp;
  route: LessonFirstScreenRouteProp;
}

export interface LessonSecondProps {
  navigation: LessonSecondScreenNavigationProp;
  route: LessonSecondScreenRouteProp;
}
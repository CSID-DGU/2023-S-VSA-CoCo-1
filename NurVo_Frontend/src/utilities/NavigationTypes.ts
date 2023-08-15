import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";

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

type LessonFirstScreenRouteProp = RouteProp<HomeStackParamList, 'LessonFirstScreen'>;
type LessonSecondScreenRouteProp = RouteProp<HomeStackParamList, 'LessonSecondScreen'>;
type LessonThirdScreenRouteProp = RouteProp<HomeStackParamList, 'LessonThirdScreen'>;

export interface HomeStackScreenProps {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  route: RouteProp<HomeStackParamList, 'HomeScreen'>;
}

export interface LessonFirstProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase, 'LessonFirstScreen'>;
}

export interface LessonSecondProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase, 'LessonSecondScreen'>;
}

export interface LessonThirdProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase, 'LessonThirdScreen'>;
}
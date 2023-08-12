import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

type HomeStackParamList = {
    HomeScreen: undefined;
    LessonFirstScreen: undefined;
    LessonSecondScreen: undefined;
    LessonThirdScreen: undefined;
  }
export type HomeScreenNavigationProp = NativeStackNavigationProp<
    HomeStackParamList,
    'HomeScreen'
>;


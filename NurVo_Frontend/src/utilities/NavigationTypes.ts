import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type HomeStackParamList = {
    HomeScreen: undefined;
    LessonFirstScreen: undefined;
  }
export type HomeScreenNavigationProp = NativeStackNavigationProp<
    HomeStackParamList,
    'HomeScreen'
>;
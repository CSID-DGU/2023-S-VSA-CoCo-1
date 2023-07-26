import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { DataProps } from "../pages/SelectText";
import { RouteProp } from "@react-navigation/native";


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


type LibraryStackParamList = {
  SelectText: undefined;
  StudyPage: { data: DataProps[] };
};

// export type StudyPageProps = NativeStackScreenProps<LibraryStackParamList, 'StudyPage'>;

type StudyPageNavigationProp = NativeStackNavigationProp<LibraryStackParamList, 'StudyPage'>;
type StudyPageRouteProp = RouteProp<LibraryStackParamList, 'StudyPage'>;

export type StudyPageProps = {
  navigation: StudyPageNavigationProp;
  route: StudyPageRouteProp;
};

import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Chapter } from "../pages/LessonsList";

export type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  Chapter: undefined;
  Main: undefined;
};

export type HomeStackParamList = {
  LaunchFirstScreen: undefined;
  MainPage: undefined;
  Login: undefined;
  SignUp: undefined;
  HomeScreen: undefined;
  LessonList: {
    title?: string,
    chapters?: Chapter[],
  };
  SelectStepScreen: {
    chapter: Chapter
  };
  FirstStepInfoScreen: {
    chapter: Chapter
  };
  LessonFirstScreen: {
    chapterId: number,
    chapter_name: string,
    step: number,
    isVoiceMode: boolean,
  };
  LessonSecondScreen: {
    chapterId: number,
    chapter_name: string,
    step: number,
  };
  LessonThirdScreen: {
    chapterId: number,
    chapter_name: string,
    step: number,
  };
  MemberDetails: undefined;
  SetUserGoal: undefined;
}
export type HomeStackNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;
export interface HomeStackScreenProps {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  route: RouteProp<HomeStackParamList, 'HomeScreen'>;
}

export type ChapterStackParamList = {
  AllLessonsList: undefined;
  SelectStepScreen: {
    chapter: Chapter
  };
  FirstStepInfoScreen: {
    chapter: Chapter
  };
  LessonFirstScreen: {
    chapterId: number,
    chapter_name: string,
    step: number,
    isVoiceMode: boolean,
  };
  LessonSecondScreen: {
    chapterId: number,
    chapter_name: string,
    step: number,
  };
  LessonThirdScreen: {
    chapterId: number,
    chapter_name: string,
    step: number,
  };
}
export type ChapterStackNavigationProp = NativeStackNavigationProp<
  ChapterStackParamList,
  'AllLessonsList'
>;
export interface ChapterStackScreenProps {
  navigation: NativeStackNavigationProp<ChapterStackParamList, 'AllLessonsList'>;
  route: RouteProp<ChapterStackParamList, 'AllLessonsList'>;
}

//HomeScreen
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'HomeScreen'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;
export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

//LessonList
type LessonListScreenRouteProp = RouteProp<HomeStackParamList, 'LessonList'>;
type LessonListScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'LessonList'
>;
export interface LessonListProps {
  navigation: LessonListScreenNavigationProp;
  route: LessonListScreenRouteProp;
}

//LessonFirstScreen
type LessonFirstScreenRouteProp = RouteProp<HomeStackParamList | ChapterStackParamList, 'LessonFirstScreen'>;
type LessonFirstScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList | ChapterStackParamList, 'LessonFirstScreen'>;
export interface LessonFirstProps {
  navigation: LessonFirstScreenNavigationProp;
  route: LessonFirstScreenRouteProp;
}

//LessonSecondScreen
type LessonSecondScreenRouteProp = RouteProp<HomeStackParamList | ChapterStackParamList, 'LessonSecondScreen'>;
type LessonSecondScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList | ChapterStackParamList, 'LessonSecondScreen'>;
export interface LessonSecondProps {
  navigation: LessonSecondScreenNavigationProp;
  route: LessonSecondScreenRouteProp;
}

//LessonThirdScreen
type LessonThirdScreenRouteProp = RouteProp<HomeStackParamList | ChapterStackParamList, 'LessonThirdScreen'>;
type LessonThirdScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList | ChapterStackParamList, 'LessonThirdScreen'>;
export interface LessonThirdProps {
  navigation: LessonThirdScreenNavigationProp;
  route: LessonThirdScreenRouteProp;
}

type SelectStepScreenRouteProp = RouteProp<HomeStackParamList | ChapterStackParamList, 'SelectStepScreen'>;
type SelectStepScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList | ChapterStackParamList, 'SelectStepScreen'>;
export interface SelectStepProp {
  navigation: SelectStepScreenNavigationProp;
  route: SelectStepScreenRouteProp;
}

type FirstStepInfoRouteProp = RouteProp<HomeStackParamList | ChapterStackParamList, 'FirstStepInfoScreen'>;
type FirtstStepInfoNavigationProp = NativeStackNavigationProp<HomeStackParamList | ChapterStackParamList, 'FirstStepInfoScreen'>;
export interface FirstStepInfoProp {
  navigation: FirtstStepInfoNavigationProp;
  route: FirstStepInfoRouteProp;
}


export type MainStackParamList = {
  MainPage: undefined;
  Login: undefined;
  SignUp: undefined;
}
export type MainScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'MainPage'
>;
export interface MainStackScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamList, 'MainPage'>;
  route: RouteProp<MainStackParamList, 'MainPage'>;
}
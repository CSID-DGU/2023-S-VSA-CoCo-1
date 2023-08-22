import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { differenceInDays } from 'date-fns';

import Colors from '../utilities/Color';
import { Title01, Title02, Subtitle011, Subtext013, Body022, Body023, Body024, Body013 } from '../utilities/Fonts';
import { layoutStyles, screenWidth } from '../utilities/Layout';
import { CarouselList } from '../components/CarouselListComp';
import { ListCell } from '../components/ListCellComp';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { play, stopSpeech } from '../utilities/TextToSpeech';
import { HomeScreenProps } from '../utilities/NavigationTypes';
import { fetchAttendance, fetchMypage, fetchReviews, fetchTodaysLesson } from '../utilities/ServerFunc';
import { Chapter } from './LessonsList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MenuTitle = ({ text, onPress }: { text: string, onPress: () => void }) => {
  return (
    <View style={[layoutStyles.HStackContainer, { marginTop: 20, paddingTop: 12, paddingHorizontal: 20 }]}>
      <Subtitle011 text={text} color={Colors.BLACK} />
      <TouchableOpacity onPress={onPress} style={[layoutStyles.HStackContainer]}>
        <Body024 text='more' color={Colors.GRAY05} />
        <Ionicons name='chevron-forward-outline' size={14} color={Colors.GRAY05} />
      </TouchableOpacity>
    </View>
  );
}

interface UserInfo {
  id: string;
  name: string;
  nickname: string;
  phone: string;
  obj: string;
  obj_date: string;
}

async function isFirstLogin(userId: string): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(`firstLogin:${userId}`);
    if (value === null) {
      await AsyncStorage.setItem(`firstLogin:${userId}`, 'false');
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
function UserInfoHeader({ numOfReview }: { numOfReview: number }) {
  const navigation = useNavigation();

  const [userdata, setUserdata] = useState({});
  const [progress, setProgress] = useState(0);
  const [dueDate, setDueDate] = useState(0);
  const [attendance, setAttendance] = useState<boolean[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function getUserData() {
        try {
          const user = await fetchMypage();
          setUserdata(user);
          setDueDate(getDueDate(user.obj_date));
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
      getUserData();
    }, [])
  );

  function formatDate(date: string) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate();
  
    const formattedDate = `${year}.${month}.${day}`;
    return formattedDate;
  }

  //최초 로그인 검사 -> 목표가 설정되어 있는지 확인
  useEffect(() => {
    async function checkFirstLogin() {
      if((userdata.obj === null || userdata.obj === "") || (userdata.obj_date === null || userdata.obj_date === "")) {
        navigation.navigate('SetUserGoal', { data: { obj: 1, obj_date: formatDate(Date.now()) }, prevScreen: 'HomeScreen' });
      }
    }
    checkFirstLogin();
  }, [userdata])

  useEffect(() => {
    setProgress((numOfReview / 24) * 100);
  }, [numOfReview]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchAttendance();
        setAttendance(convertAttendance(data));
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    setProgress((numOfReview / 24) * 100);
    getData();
  }, []);

  type Day = { day: string };
  function convertAttendance(days: Day[]) {
    return daysOfWeek.map(dayOfWeek => days.some(d => d.day === dayOfWeek));
  }

  interface CircleTextProps {
    text: string;
    backgroundColor?: string;
    isAttend: boolean;
  }



  const CircleText = ({ text, backgroundColor, isAttend }: CircleTextProps) => {
    return (
      <View style={[styles.circleBackground, { backgroundColor }]}>
        <Subtext013 text={text} color={isAttend ? Colors.WHITE : Colors.MAINGREEN} />
      </View>
    );
  };

  const DaysRow = () => {
    return (
      <View style={[layoutStyles.HStackContainer, { width: screenWidth - 40, paddingTop: 12 }]}>
        {daysOfWeek.map((day, index) => (
          <CircleText key={day} text={day} backgroundColor={attendance[index] ? Colors.MAINGREEN : Colors.WHITE} isAttend={attendance[index]} />
        ))}
      </View>
    );
  };

  function getDueDate(dateString: string): number {
    const date = new Date(dateString.replace(/\./g, '-'));
    const today = new Date();
    return differenceInDays(date, today);
  }


  return (
    <View style={styles.headerBackground}>
      <View style={[layoutStyles.VStackContainer, { paddingHorizontal: 20, paddingVertical: 16, marginTop: 20 }]}>
        <View style={[layoutStyles.HStackContainer, { flex: 1 }]}>
          <View style={layoutStyles.VStackContainer}>
            <View style={[styles.headerText]}>
              <Title01 text="Hi," color={Colors.BLACK} />
              <Title02 text={userdata?.nickname} color={Colors.BLACK} />
              <Ionicons name="settings" size={20} color={Colors.MAINLIGHTGREEN} style={{ marginHorizontal: 5 }} />
            </View>
            <View style={layoutStyles.HStackContainer}>
              <View style={styles.tagBackground}>
                <Body023 text={`D-${dueDate}days`} color={Colors.WHITE} />
              </View>
            </View>
          </View>
          <AnimatedCircularProgress
            size={102}
            width={16}
            fill={progress}
            rotation={0}
            tintColor={Colors.MAINGREEN}
            lineCap='round'
            backgroundColor={Colors.GRAY09} />
        </View>
        <View style={layoutStyles.VStackContainer}>
          <Body022 text="attendance" />
          <DaysRow />
        </View>
      </View>
    </View>
  );
}

interface Review {
  chapter_id: number;
  chapter_name: string;
  date: string;
  step: number;
  topic_name: string;
}

interface Todays {
  chapter_id: number;
  chapter_name: string;
  date: string;
  step: number;
  topic_id: number;
  topic_name: string;
}


export default function Home({ navigation, route }: HomeScreenProps) {

  const [todays, setTodays] = useState<Chapter[]>([]);
  const [reviews, setReviews] = useState<Chapter[]>([]);
  const [numOfReview, setNumOfReview] = useState<number>(0);

  useEffect(() => {
    stopSpeech();
  }, [play]);

  //todays lesson
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const data = await fetchTodaysLesson();
          if (!data) return;
          const sectionData: Chapter[] = data.map((item: Todays) => ({
            id: item.chapter_id,
            name: item.chapter_name,
            description: item.topic_name,
            step: item.step
          }));
          setTodays([]);
          setTodays(sectionData);
  
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, [])
  );
  //fetch reviews
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchReviews();
        if (!data) return;
        const sectionData: Chapter[] = data.map((item: Review) => ({
          id: item.chapter_id,
          name: item.chapter_name,
          description: item.topic_name,
          step: item.step
        }));
        setReviews(sectionData);

      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    setNumOfReview(reviews.length);
  }, [reviews]);

  const handleUserPage = () => {
    navigation.navigate('MemberDetails');
  }

  return (
    <ScrollView>
      <View style={layoutStyles.VStackContainer}>
        <TouchableHighlight onPress={handleUserPage}>
          <UserInfoHeader numOfReview={numOfReview} />
        </TouchableHighlight>
        <View style={[layoutStyles.VStackContainer]}>
          <MenuTitle text='Today’s Lesson' onPress={() => {
            navigation.navigate('LessonList', { title: "Today’s Lesson", chapters: todays });
          }} />
          {todays.length > 0 && (<CarouselList gap={8} offset={12} pages={todays.slice(0, 3)} pageWidth={screenWidth - (8 + 12) * 2} />)}
          <MenuTitle text='Review' onPress={() => {
            navigation.navigate('LessonList', { title: "Review", chapters: reviews });
          }} />
          <View style={[layoutStyles.VStackContainer, { marginTop: 4, marginBottom: 28, paddingHorizontal: 20 }]}>
            {reviews.length > 0 && reviews.slice(0, 2).map((lesson, index) => (
              <ListCell
                key={index}
                item={lesson}
                style={{ width: screenWidth - 20 * 2, marginVertical: 4 }}
              />
            ))}
            {
              reviews.length === 0 && (
                <View style={{ height: 100, justifyContent: 'center', alignItems:'center' }}>
                  <Body013 text="아직 복습할 내용이 없어요" color={Colors.GRAY05} />
                </View>
              )
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  headerText: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  headerBackground: {
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'space-evenly',

    width: '100%',
    height: 250,

    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,

    shadowColor: Colors.GRAY09,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  tagBackground: {
    flex: 0,
    backgroundColor: Colors.MAINGREEN,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: Colors.GRAY07,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
  },
  circleBackground: {
    width: 36,
    height: 36,
    borderRadius: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',

    ...Platform.select({
      ios: {
        shadowColor: Colors.GRAY08,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },

});

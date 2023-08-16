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

import Colors from '../utilities/Color';
import { Title01, Title02, Subtitle011, Subtext013, Body022, Body023, Body024 } from '../utilities/Fonts';
import { layoutStyles, screenWidth } from '../utilities/Layout';
import { CarouselList } from '../components/CarouselListComp';
import { ListCell } from '../components/ListCellComp';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { stopSpeech } from '../utilities/TextToSpeech';
import { HomeScreenProps } from '../utilities/NavigationTypes';
import { fetchAllTopic } from '../utilities/ServerFunc';
import { Section } from './LessonsList';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const todayLessons = [
  {
    id: 1,
    name: 'Hospital life guidance',
    description: 'location of call bell, meal times, shower times, etc.',
    topic_id: 1,
  },
  {
    id: 2,
    name: '1 Hospital life guidance',
    description: '1 location of call bell, meal times, shower times, etc.',
    checked: true,
    topic_id: 1,
  },
  {
    id: 3,
    name: '2 Hospital life guidance',
    description: '2 location of call bell, meal times, shower times, etc.',
    checked: true,
    topic_id: 1,
  }
]

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

function UserInfoHeader() {
  const navigation = useNavigation();

  interface CircleTextProps {
    text: string;
    backgroundColor?: string;
  }



  const CircleText = ({ text, backgroundColor }: CircleTextProps) => {
    return (
      <View style={[styles.circleBackground, { backgroundColor }]}>
        <Subtext013 text={text} color={Colors.MAINGREEN} />
      </View>
    );
  };

  const DaysRow = () => {
    return (
      <View style={[layoutStyles.HStackContainer, { width: screenWidth - 40, paddingTop: 12 }]}>
        {days.map(day => (
          <CircleText key={day} text={day} backgroundColor={Colors.WHITE} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.headerBackground}>
      <View style={[layoutStyles.VStackContainer, { paddingHorizontal: 20, paddingVertical: 16, marginTop: 20 }]}>
        <View style={[layoutStyles.HStackContainer, { flex: 1 }]}>
          <View style={layoutStyles.VStackContainer}>
            <View style={[styles.headerText]}>
              <Title01 text="Hi," color={Colors.BLACK} />
              <Title02 text="Jimin" color={Colors.BLACK} />
              <Ionicons name="settings" size={20} color={Colors.MAINLIGHTGREEN} style={{ marginHorizontal: 5 }} />
            </View>
            <View style={styles.tagBackground}>
              <Body023 text="D-100days" color={Colors.WHITE} />
            </View>
          </View>
          <AnimatedCircularProgress
            size={102}
            width={16}
            fill={10}
            rotation={0}
            tintColor={Colors.MAINGREEN}
            lineCap='round'
            onAnimationComplete={() => console.log('onAnimationComplete')}
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



export default function Home({ navigation, route }: HomeScreenProps) {

  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    stopSpeech();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllTopic();
        if (!data) return;
        const sectionData: Section[] = data.map(item => ({
          topic: item.topic,
          chapter: item.chapter.map(chapter => ({
            id: chapter.id,
            name: chapter.name,
            description: chapter.description,
            topic_id: chapter.topic_id
          }))
        }));
        setSections(sectionData);

      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleUserPage = () => {
    navigation.navigate('MemberDetails');
  }

  return (
    <ScrollView>
      <View style={layoutStyles.VStackContainer}>
        <TouchableHighlight onPress={handleUserPage}>
          <UserInfoHeader />
        </TouchableHighlight>
        <View style={[layoutStyles.VStackContainer]}>
          <MenuTitle text='Today’s Lesson' onPress={() => {
            navigation.navigate('LessonList', { title: "Today’s Lesson", chapters: sections[1].chapter });
          }} />
          { sections.length>0 && (<CarouselList gap={8} offset={12} pages={sections[1].chapter} pageWidth={screenWidth - (8 + 12) * 2} />)}
          <MenuTitle text='Review' onPress={() => {
            navigation.navigate('LessonList', { title: "Review", chapters: sections[0].chapter });
          }} />
          <View style={[layoutStyles.VStackContainer, { marginTop: 4, marginBottom: 28, paddingHorizontal: 20 }]}>
            {sections.length>0 && sections[0].chapter.slice(0, 2).map((lesson, index) => (
              <ListCell
                key={index}
                item={lesson}
                checked={true}
                style={{ width: screenWidth - 20 * 2, marginVertical: 4 }}
              />
            ))}
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

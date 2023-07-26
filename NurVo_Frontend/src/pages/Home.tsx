import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../utilities/Color';
import { Title01, Title02, Subtitle011, Subtext013, Body022, Body023, Body024 } from '../utilities/Fonts';
import { layoutStyles, screenWidth } from '../utilities/Layout';

import { CarouselList } from '../components/CarouselListComp';
import { ListCell } from '../components/ListCellComp';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const todayLessons = [
  {
    title: 'Hospital life guidance',
    subtitle: 'location of call bell, meal times, shower times, etc.',
  },
  {
    title: '1 Hospital life guidance',
    subtitle: '1 location of call bell, meal times, shower times, etc.',
    checked: true,
  },
  {
    title: '2 Hospital life guidance',
    subtitle: '2 location of call bell, meal times, shower times, etc.',
    checked: true,
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
      <View style={[layoutStyles.VStackContainer, { paddingHorizontal: 20, paddingVertical: 16, marginTop: 20}]}>
        <View style={[layoutStyles.HStackContainer, { flex: 1 }]}>
          <View style={layoutStyles.VStackContainer}>
            <View style={[styles.headerText]}>
              <Title01 text="Hi," color={Colors.BLACK} />
              <Title02 text="Jimin" color={Colors.BLACK} />
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



export default function Home({ navigation }: { navigation: any }) {
  return (
    <ScrollView>
      <View style={layoutStyles.VStackContainer}>
        <UserInfoHeader />
        <View style={[layoutStyles.VStackContainer]}>
          <MenuTitle text='Today’s Lesson' onPress={() => {
            navigation.navigate('LessonsList');
          }} />
          <CarouselList gap={8} offset={12} pages={todayLessons} pageWidth={screenWidth - (8 + 12) * 2} />
          <MenuTitle text='Review' onPress={() => {
            navigation.navigate('LessonsList');
          }} />
          <View style={[layoutStyles.VStackContainer, { marginTop: 4, marginBottom:28 }]}>
            {todayLessons.slice(0, 2).map((lesson, index) => (
              <ListCell
                key={index}
                item={lesson}
                checked={true}
                style={{ width: screenWidth - 20 * 2, marginHorizontal: 20, marginVertical: 4 }}
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
    backgroundColor: 'red',
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

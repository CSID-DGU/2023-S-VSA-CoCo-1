import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import BookMarkList from '../components/BookMarkList';
import Colors from '../utilities/Color';
import { screenWidth } from '../utilities/Layout';
import axios from 'axios';

async function getBookmark() {
  const response = await axios.get<{ data: [] }>('http://10.0.2.2:5000/api/bookmark');
  try {
    console.log('들어온 데이터', response.data);
  } catch (e) {
    console.log(e);
  }
  return response.data;
}

const Library = ({ navigation }: { navigation: any }) => {
  const [libraryData, setLibraryData] = useState([]);
  const [trueCount, setTrueCount] = useState(0);
  const [seletedList, setSeletedList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getBookmark();
      setLibraryData(data);
    }
    getData();
  }, []);

  const handleSeletedID = (value: {
    dialogue: string;
    chapter: string;
    date: string;
    korean: string;
  }[]) => {
    setSeletedList(value);
  };

  const handleTureCount = (value: number) => {
    setTrueCount(value);
  };

  const studyPageLoad = () => {
    if (trueCount === 0) {
      navigation.navigate('StudyPage', { data: libraryData });
    } else {

      navigation.navigate('StudyPage', { data: seletedList });
    }
  };

  return (
    <View style={styles.container}>
      <BookMarkList
        dataArray={libraryData}
        seletedBookMarkList={handleSeletedID}
        trueCount={handleTureCount} />
      <TouchableOpacity style={styles.btn} onPress={studyPageLoad}>
        <Text style={styles.btnText}>{trueCount === 0 ? '전체 학습하기' : '선택 문장 학습하기'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -screenWidth * 0.45 }],
    width: screenWidth * 0.9,
    borderRadius: 20,
    backgroundColor: Colors.MAINGREEN,
  },
  btnText: {
    paddingVertical: 10,
    fontFamily: 'Pretendard Variable',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.WHITE,
  },
});

export default Library;

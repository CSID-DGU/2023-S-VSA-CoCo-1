import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Colors from '../utilities/Color';
import { Body011 } from '../utilities/Fonts';
import { screenWidth } from '../utilities/Layout';
import BookmarkList from '../components/BookmarkList';

// 데이터 불러오기
async function getBookmark() {
  const response = await axios.get<{ data: [] }>('http://10.0.2.2:5000/api/bookmark');
  try {
    console.log('들어온 데이터', response.data);
  } catch (e) {
    console.log(e);
  }
  return response.data;
}

// 데이터 내보내기
async function deleteBookmark(data: []) {
  try {
    const response = await axios.post('http://10.0.2.2:5000/api/bookmark/delete', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.message);
  } catch (e) {
    console.error('Error sending POST request:', e);
  }
}

const Bookmark = ({ navigation, route }) => {
  const DeleteAction = route.params;
  const [libraryData, setLibraryData] = useState([]);
  const [trueCount, setTrueCount] = useState(0);
  const [seletedList, setSeletedList] = useState([]);
  const [initialIsDelete, setInitialIsDelete] = useState(DeleteAction ? route.params.data : false);

  useEffect(() => {
    const getData = async () => {
      const data = await getBookmark();
      setLibraryData(data);
    }
    getData();
  }, []);

  // 삭제 버튼 클릭 시 삭제 모드로 전환
  useEffect(() => {
    if (DeleteAction) {
      setInitialIsDelete(route.params.data);
    }
  }, [DeleteAction]);

  // 선택된 북마크 저장
  const handleSeletedID = (value: any) => {
    setSeletedList(value);
  };

  // 선택된 북마크 개수 확인
  const handleTureCount = (value: number) => {
    setTrueCount(value);
  };

  // 학습 화면으로 이동
  const studyPageLoad = () => {
    if (!initialIsDelete) {
      if (trueCount === 0) {
        navigation.navigate('StudyPage', { data: libraryData });
      } else {
        navigation.navigate('StudyPage', { data: seletedList });
      }
    } else {

    }
  };

  // 데이터 삭제
  const bookmarkDelete = () => {
    deleteBookmark(seletedList);
    setInitialIsDelete(false);
  };

  return (
    <View style={styles.container}>
      <BookmarkList
        dataArray={libraryData}
        isDelete={initialIsDelete}
        seletedBookMarkList={handleSeletedID}
        trueCount={handleTureCount} />
      {!initialIsDelete ?
        <TouchableOpacity style={styles.btn} onPress={studyPageLoad}>
          <Body011
            text={`${trueCount === 0 ? '전체 학습하기' : '선택 문장 학습하기'}`}
            color={Colors.WHITE}
            style={{ paddingVertical: 10 }}
          />
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.btn} onPress={bookmarkDelete}>
          <Body011
            text={`${trueCount} 개를 삭제합니다`}
            color={Colors.WHITE}
            style={{ paddingVertical: 10 }}
          />
        </TouchableOpacity>
      }
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
});

export default Bookmark;

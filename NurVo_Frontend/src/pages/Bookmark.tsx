import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Colors from '../utilities/Color';
import { Body011 } from '../utilities/Fonts';
import { screenWidth } from '../utilities/Layout';
import BookMarkList from '../components/BookMarkList';
import { deleteLibraryBookmark, fetchBookmark } from '../utilities/ServerFunc';

const Bookmark = ({ navigation, route }) => {
  const DeleteAction = route.params;
  const [libraryData, setLibraryData] = useState([]);
  const [fixed, setFixed] = useState([]);
  const [trueCount, setTrueCount] = useState(0);
  const [seletedList, setSeletedList] = useState([]);
  const [initialIsDelete, setInitialIsDelete] = useState(DeleteAction ? route.params.data : false);
  const [isDisable, setIsDisable] = useState(false);

  // 데이터 불러오기
  useEffect(() => {
    async function getBookmark() {
      try {
        const bookmark = await fetchBookmark();
        setLibraryData(bookmark);
        setFixed(bookmark);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    getBookmark();
  }, []);

  useEffect(() => {
    async function getBookmark() {
      try {
        const bookmark = await fetchBookmark();
        setLibraryData(bookmark);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    if (!compareArrays(libraryData, fixed)) {
      getBookmark();
      setFixed(libraryData);
    }
  }, [libraryData, fixed]);

  // 데이터 삭제
  useEffect(() => {
    async function deleteBookmark() {
      try {
        const newdata = await deleteLibraryBookmark(seletedList);
        setLibraryData(newdata);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
    if (isDisable) {
      deleteBookmark();
      setIsDisable(false);
    }
  }, [isDisable]);

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
    };
  }

  const deleteBookmark = () => {
    setIsDisable(true);
    setInitialIsDelete(false);
  }

  // 배열 비교
  const compareArrays = (array1: [], array2: []) => {
    if (!array1 || !array2) {
      return true; // 하나라도 배열이 정의되지 않았을 경우 불일치로 판단
    }

    if (array1.length !== array2.length) {
      return false; // 배열 길이가 다르면 불일치로 판단
    }

    return true;
  }

  return (
    <View style={styles.container}>
      <BookMarkList
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
        <TouchableOpacity style={styles.btn} onPress={deleteBookmark}>
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

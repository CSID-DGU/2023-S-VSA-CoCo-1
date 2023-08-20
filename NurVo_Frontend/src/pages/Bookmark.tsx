import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Colors from '../utilities/Color';
import { Body011 } from '../utilities/Fonts';
import { screenWidth } from '../utilities/Layout';
import { deleteLibraryBookmark, fetchBookmark } from '../utilities/ServerFunc';
import BookMarkList from '../components/BookMarkList';
import HeaderButton from '../components/HeaderButton';

const Bookmark = ({ navigation, route }) => {
  const [libraryData, setLibraryData] = useState([]); // 실제 북마크 표현 데이터
  const [fixed, setFixed] = useState([]); // 북마크 삭제 시 비교하는 데이터 
  const [trueCount, setTrueCount] = useState(0); // 선택된 북마크 개수
  const [seletedList, setSeletedList] = useState([]); // 선택된 북마크
  const [initialIsDelete, setInitialIsDelete] = useState(false); // 네비게이션 바 모드 설정
  const [isDisable, setIsDisable] = useState(false); // 삭제 버튼 클릭 시 백엔드에 전달

  // 데이터 불러오기
  useEffect(() => {
    getBookmark();
    setFixed(libraryData);
  }, []);

  useEffect(() => {
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

  // 네비게이션 바 커스텀 컴포넌트
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton types='delete' isDeleteAction={initialIsDelete} ondelete={(value)=> setInitialIsDelete(value)} />
      ),
    });
  }, [navigation, initialIsDelete]);

  // 데이터 불러오는 함수
  async function getBookmark() {
    try {
      const bookmark = await fetchBookmark();
      setLibraryData(bookmark);
    } catch (error) {
      console.error('Error fetching bookmark:', error);
    }
  }

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

  // 삭제모드로 변환
  const deleteBookmark = () => {
    setIsDisable(true);
    setInitialIsDelete(false);
  }

  // 배열 비교
  const compareArrays = (array1: [], array2: []) => {
    if (!array1 || !array2) {
      return true;
    }
    if (array1.length !== array2.length) {
      return false;
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

import { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated, FlatList } from 'react-native';

import Colors from '../utilities/Color.js';
import BoomarkComp from './BoomarkComp';

interface BookmarkListProbs {
  dataArray: {
    conversation_id: number,
    dialogue: string,
    chapter: string,
    date: string,
    korean: string,
  }[],
  isDelete: boolean,

  trueCount: (value: number) => void,
  seletedBookMarkList: (value: {
    conversation_id: number,
    dialogue: string,
    chapter: string,
    date: string,
    korean: string,
  }[]) => void;
}

const BookmarkList = ({ dataArray, isDelete, trueCount, seletedBookMarkList }: BookmarkListProbs) => {
  const flatListRef = useRef<FlatList>(null);
  const dataLength = dataArray.length;
  const [animationValue] = useState(new Animated.Value(0));
  const [count, setCount] = useState(0);
  const [seletedList, setseletedList] = useState([]);
  const [deletedList, setDeletedList] = useState([]);
  const [isActionAll, setIsActionAll] = useState(false);

  // 값이 변할 때마다 Bookmark로 정보 전달
  useEffect(() => {
    if (!isDelete) {
      seletedBookMarkList(seletedList);
      trueCount(count);
    } else {
      seletedBookMarkList(deletedList);
      trueCount(count);
    }
  }, [seletedList, deletedList, count]);

  // 모드 변경 시 초기화
  useEffect(() => {
    setseletedList([]);
    setDeletedList([]);
    setCount(0);
  }, [isDelete]);

  // 모드에 따른 전체 선택 동작
  useEffect(() => {
    if (!isDelete) {
      checkSeleted();
      allSelectAction();
    } else {
      checkSeleted();
      allDeletedAction();
    }
  }, [isActionAll]);

  // BookmarkComp 선택 시 발생하는 animation
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: count >= 1 ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [count, animationValue]);

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  // 학습 및 삭제 모드 일 때 동작
  const handleSelectedID = (value: number) => {
    if (!isDelete) { // 학습 모드
      const newArray = [...seletedList];
      const idx = newArray.findIndex((item) => value === item.conversation_id);
      if (idx === -1) {
        const index = dataArray.findIndex((item) => value === item.conversation_id);
        newArray.push(dataArray[index]);
        setseletedList(newArray);
        setCount((prev) => prev + 1);
      } else {
        newArray.splice(idx, 1);
        setseletedList(newArray);
        setCount((prev) => prev - 1);
      }
    } else { // 삭제 모드
      const newArray = [...deletedList];
      const idx = newArray.findIndex((item) => value ===  item);
      if (idx === -1) {;
        newArray.push(value);
        setDeletedList(newArray);
        setCount((prev) => prev + 1);
      } else {
        newArray.splice(idx, 1);
        setDeletedList(newArray);
        setCount((prev) => prev - 1);
      }
    }
  };

  // 전체 선택
  const allSelect = () => {
    setIsActionAll((prev) => !prev);
  };

  // 이미 모두 선택된 상황에서 전체 선택을 누를 경우 전체 선택 취소
  const checkSeleted = () => {
    if (count === dataLength) {
      setIsActionAll(false);
    }
  }

  // 전체: 학습 모드
  const allSelectAction = () => {
    if (isActionAll) {
      setseletedList(dataArray);
      setCount(dataLength);
    } else {
      setseletedList([]);
      setCount(0);
    }
  }

  // 전체: 삭제 모드
  const allDeletedAction = () => {
    if (isActionAll) {
      setDeletedList(dataArray.map(item => item.conversation_id));
      setCount(dataLength);
    } else {
      setDeletedList([]);
      setCount(0);
    }
  }

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const isLastItem = index === dataArray.length - 1;

    return (
      <View key={index}>
        <BoomarkComp
          id={item.conversation_id}
          context={item.dialogue}
          chapter={item.chapter}
          count={count}
          length={dataLength}
          isLastItem={isLastItem}
          isActionAll={isActionAll}
          isDelete={isDelete}
          seletedBookMark={handleSelectedID}
        />
      </View>
    );
  };

  return (
    <View style={containerStyles.constainer}>
      <Animated.View style={[containerStyles.menuBarContainer, { transform: [{ translateY }] }]}>
        <Text style={textStyles.menuText}>✓ {count}개 선택됨</Text>
        <TouchableOpacity onPress={allSelect}>
          <Text
            style={[
              textStyles.menuText,
              isActionAll || count == dataArray.length
                ? textStyles.checkedMenuText
                : null,
            ]}>
            전체 선택
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <FlatList
        ref={flatListRef}
        data={dataArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
      />
    </View>
  );
}

const containerStyles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  menuBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

const textStyles = StyleSheet.create({
  menuText: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: 'black',
  },
  checkedMenuText: {
    opacity: 0.5,
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

export default BookmarkList;
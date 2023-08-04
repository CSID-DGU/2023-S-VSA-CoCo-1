import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated, FlatList } from 'react-native';
import { Body017, Subtext012 } from '../utilities/Fonts';
import BookMark from './BookMark';
import Colors from '../utilities/Color.js';
import { screenWidth } from '../utilities/Layout';

interface BookMarkProps {
  dataArray: {
    id: string;
    chapter: string;
    english: string;
    korean: string;
  }[];
  allSelet: boolean;
  trueCount: (value: number) => void;
  seletedBookMarkList: (value: {
    id: string;
    chapter: string;
    english: string;
    korean: string;
  }[]) => void;
}

const BookMarkList = ({ dataArray, trueCount, seletedBookMarkList }: BookMarkProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [animationValue] = useState(new Animated.Value(0));
  const [count, setCount] = useState(0);
  const [seletedList, setseletedList] = useState([]);
  const [isActionAll, setIsActionAll] = useState(false);

  useEffect(()=>{
    if (isActionAll){
      setseletedList(dataArray);
      setCount(dataArray.length);
    } else {
      setseletedList([]);
      setCount(0);
    }
  },[isActionAll]);

  useEffect(() => {
    seletedBookMarkList(seletedList);
    trueCount(count);
  }, [seletedList, count]);

  useEffect(() => {
    // trueCount 상태가 변경될 때 애니메이션 실행
    Animated.timing(animationValue, {
      toValue: count >= 1 ? 1 : 0,
      duration: 500, // 애니메이션 지속 시간 (0.5초)
      useNativeDriver: false, // true일 경우, 네이티브 런타임에 애니메이션을 실행하도록 설정
    }).start();
  }, [count, animationValue]);

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0], // 0과 1의 값에 대한 translateY의 변화량
  });

  const handleSelectedID = (value: string) => {
    const newArray = [...seletedList];
    const idx = seletedList.findIndex((item) => value === item.id);
    if (idx === -1) {
      const index = dataArray.findIndex((item) => value === item.id);
      newArray.push(dataArray[index]);
      setseletedList(newArray);
      setCount((prev) => prev + 1);
    } else {
      newArray.splice(idx, 1);
      setseletedList(newArray);
      setCount((prev) => prev - 1);
    }
  };

  const allSelect = () => {
    setIsActionAll((prev) => !prev);
  };

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const isLastItem = index === dataArray.length - 1;

    return (
      <BookMark
        id={item.id}
        context={item.english}
        chapter={item.chapter}
        isLastItem={isLastItem}
        actionAll={isActionAll}
        count={count}
        length={dataArray.length}
        seletedBookMark={handleSelectedID}
      />
    );
  };

  return (
    <View style={styles.constainer}>
      <Animated.View style={[styles.menuBar, { transform: [{ translateY }] }]}>
        <Text style={styles.menuText}>✓ {count}개 선택됨</Text>
        <TouchableOpacity onPress={allSelect}>
          <Text style={[styles.menuText, isActionAll || count == dataArray.length ? styles.checkedMenuText : null]}>전체 선택</Text>
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

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  menuBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  menuText: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: 'black',
  },
  checkedMenuText: {
    opacity: 0.5,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: screenWidth * 0.9,
    left: '50%',
    transform: [{ translateX: -screenWidth * 0.45 }],
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


export default BookMarkList;
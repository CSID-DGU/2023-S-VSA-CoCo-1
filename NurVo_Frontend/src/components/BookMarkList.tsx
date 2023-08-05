import { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated, FlatList } from 'react-native';
import BookMark from './BookMark';
import Colors from '../utilities/Color.js';
import { screenWidth } from '../utilities/Layout';

interface BookMarkProps {
  dataArray: {
    dialogue: string;
    chapter: string;
    date: string;
    korean: string;
  }[];
  trueCount: (value: number) => void;
  seletedBookMarkList: (value: {
    dialogue: string;
    chapter: string;
    date: string;
    korean: string;
  }[]) => void;
}

const BookMarkList = ({ dataArray, trueCount, seletedBookMarkList }: BookMarkProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [animationValue] = useState(new Animated.Value(0));
  const [count, setCount] = useState(0);
  const [seletedList, setseletedList] = useState([]);
  const [isActionAll, setIsActionAll] = useState(false);

  useEffect(() => {
    if (isActionAll) {
      setseletedList(dataArray);
      setCount(dataArray.length);
    } else {
      setseletedList([]);
      setCount(0);
    }
  }, [isActionAll]);

  useEffect(() => {
    seletedBookMarkList(seletedList);
    trueCount(count);
  }, [seletedList, count]);

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

  const handleSelectedID = (value: string) => {
    const newArray = [...seletedList];
    const idx = seletedList.findIndex((item) => value === item.date);
    if (idx === -1) {
      const index = dataArray.findIndex((item) => value === item.date);
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
        id={item.date}
        context={item.dialogue}
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
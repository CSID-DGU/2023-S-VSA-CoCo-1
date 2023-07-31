import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import StudyCard from './StudyCard';

interface CardSwiperProps {
  data: {
    id: string;
    chapter: string;
    english: string;
    korean: string;
  }[];
  action: string;
  nextaction: (count: string) => void;
  alertOpen: (value: boolean) => void;
}

const CardSwiper = ({ data, action, nextaction, alertOpen }: CardSwiperProps) => {
  const [first, setFirst] = useState(true);
  const [prescount, setPresCount] = useState(0);
  const [dataArray, setDataArray] = useState(data);
  const [nextDataArray, setNextDataArray] = useState([]);
  const swiperRef = useRef<Swiper>(null);

  useEffect(() => {
    // 저장
    if (action === 'keep') {
      if (prescount >= 0) {
        const newArray = [...nextDataArray];
        newArray.push(dataArray[prescount]);
        setNextDataArray(newArray);
      }
      setPresCount(prev => prev + 1);
      nextaction('');
    }
    // 제거
    else if (action === 'remove') {
      setPresCount(prev => prev + 1);
      nextaction('');
    }
  }, [action]);

  useEffect(() => {
    if (prescount < dataArray.length) {
      if (prescount === 0 && first || dataArray.length === 0) {
        swiperRef.current?.scrollTo(0);
        setFirst(false);
      } else {
        swiperRef.current?.scrollBy(1, true); // 스와이프 진행
      }
    } else {
      if (nextDataArray.length != 0) {
        setDataArray(nextDataArray);
        setNextDataArray([]);
        setPresCount(0);
      } else {
        alertOpen(true);
      }
    }
    console.log(nextDataArray);
    console.log(prescount);
  }, [prescount]);


  return (
    <View style={styles.constainer}>
      <Swiper
        ref={swiperRef}
        autoplay={false}
        showsPagination={false}
        scrollEnabled={false}
        loop={true}>
        {dataArray.map((item, index) => (
          <View key={index}>
            <StudyCard context1={item.english} context2={item.korean} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardSwiper;


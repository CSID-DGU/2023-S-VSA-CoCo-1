import { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import StudyCard from './StudyCard';

interface CardSwiperProps {
  data: {
    conversation_id: number;
    dialogue: string;
    chapter: string;
    date: string;
    korean: string;
  }[];
  action: string;
  pageWidth: number;
  nextaction: (count: string) => void;
  alertOpen: (value: boolean) => void;
}

const CardSwiper = ({ data, action, pageWidth, nextaction, alertOpen }: CardSwiperProps) => {
  const [first, setFirst] = useState(true);
  const [prescount, setPresCount] = useState(0);
  const [dataArray, setDataArray] = useState(data);
  const [nextDataArray, setNextDataArray] = useState([]);
  const flatListRef = useRef<FlatList>(null);

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
        setFirst(false);
      } else {
        flatListRef.current?.scrollToIndex({ animated: true, index: prescount });
      }
    } else {
      if (nextDataArray.length !== 0) {
        setDataArray(nextDataArray);
        setNextDataArray([]);
        setPresCount(0);
      } else {
        alertOpen(true);
      }
    }
  }, [prescount]);

  const renderItem = ({ item }: { item: any }) => (
    <View>
      <StudyCard
        id={item.index}
        item={item}
        style={{ width: pageWidth }}
        isAction={action}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dataArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
});

export default CardSwiper;
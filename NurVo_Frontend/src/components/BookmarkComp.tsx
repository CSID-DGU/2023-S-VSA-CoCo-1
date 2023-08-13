import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import Colors from '../utilities/Color.js';
import { Body011, Subtext012 } from '../utilities/Fonts';

interface BookMarkProps {
  id: number;
  context: string;
  chapter: string;

  count: number;
  length: number;

  isLastItem: boolean;
  isActionAll?: boolean;
  isDelete: boolean;

  seletedBookMark: (value: number) => void;
}

const BookMark = ({ id, context, chapter, count, length, isLastItem, isActionAll, isDelete, seletedBookMark }: BookMarkProps) => {
  const [select, setSelect] = useState(false);
  const [unSeletedBookMark, setUnSeletedBookMark] = useState(false);

  // clicked
  const seleted = () => {
    setSelect(prev => !prev);
    seletedBookMark(id);
  }

  // count 증가 시 선택되지 않았을 때 상태 적용
  useEffect(() => {
    if (count >= 1 && !select) {
      setUnSeletedBookMark(true);
    } else {
      setUnSeletedBookMark(false);
    }
  }, [count]);

  // 전체 클릭 시 (1.선택 중 클릭 발생 / 2.전체 선택 취소)
  useEffect(() => {
    if (isActionAll && !select) {
      seleted();
    } else if (!isActionAll && select) {
      seleted();
    }
  }, [isActionAll]);

  // 삭제 모드
  useEffect(() => {
    if (select) {
      seleted();
    }
  }, [isDelete]);

  return (
    <TouchableOpacity
      style={[
        styles.item,
        isLastItem ? styles.lastItem : null,
        select ? styles.seletedItem : null,
        unSeletedBookMark ? styles.unSeletedItem : null,
      ]}
      onPress={seleted}>
      <View style={styles.contents}>
        <Body011 text={context} color={Colors.BLACK} style={{ marginHorizontal: 10, marginVertical: 10 }} numberOfLines={1} />
        <Subtext012 text={chapter} color={Colors.GRAY05} style={{ marginHorizontal: 10, marginBottom: 10 }} numberOfLines={1} />
      </View>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 20,
    marginVertical: 7,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
  },
  seletedItem: {
    borderWidth: 2,
    borderColor: Colors.MAINGREEN,
  },
  unSeletedItem: {
    opacity: 0.5
  },
  lastItem: {
    marginBottom: 62.5,
  },
  contents: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default BookMark;
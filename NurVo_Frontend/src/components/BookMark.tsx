import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import Colors from '../utilities/Color.js';
import { Body017, Subtext012 } from '../utilities/Fonts';

interface BookMarkProps {
  id: string;
  context: string;
  chapter: string;
  isLastItem: boolean;
  actionAll?: boolean;
  count: number;
  length: number;
  seletedBookMark: (value: number) => void;
}

const BookMark = ({ id, context, chapter, isLastItem, actionAll, count, length, seletedBookMark }: BookMarkProps) => {
  const [select, setSelect] = useState(false);
  const [unSeletedBookMark, setUnSeletedBookMark] = useState(false);

  const seleted = () => {
    setSelect(prev => !prev);
    seletedBookMark(id);
  }

  useEffect(() => {
    if (count >= 1 && !select) {
      setUnSeletedBookMark(true);
    } else {
      setUnSeletedBookMark(false);
    }
  }, [count]);

  useEffect(() => {
    if (count >= 1 && !select) {
      seleted();
    } else if (count === length && select) {
      seleted();
    }
  }, [actionAll]);

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
        <Body017 text={context} color={Colors.BLACK} numberOfLines={1} ellipsizeMode='tail' />
        <Subtext012 text={chapter} color={Colors.GRAY05} numberOfLines={1} ellipsizeMode='tail' />
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
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import BookMarkList from '../components/BookMarkList';
import Colors from '../utilities/Color';
import { screenWidth } from '../utilities/Layout';
import axios from 'axios';

// 북마크된 문장
const Data = [
  { id: '1', chapter: 'Initial Meeting with the Patient.', english: '1I am the nurse who will be in nurse who will be in nurse who will be in charge of the patient today.', korean: '한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어한국어1' },
  { id: '2', chapter: 'Initial Meeting with the Patient.', english: '2I am the nurse who will be in charge of the patient today.', korean: '한국zcxczczczxczxc어2' },
  { id: '3', chapter: 'Initial Meeting with the Patient.', english: '3I am the nurse who will be in charge of the patient today.', korean: '한국zxczxczxczxczx어3' },
  { id: '4', chapter: 'Initial Meeting with the Patient.', english: '4I am the nurse who will be in charge of the patient today.', korean: '한czczxczxcczxczczczczczczczz국어4' },
  { id: '5', chapter: 'Initial Meeting with the Patient.', english: '5I am the nurse who will be in charge of the patient today.', korean: '한국어5' },
  { id: '6', chapter: 'Initial Meeting with the Patient.', english: '6I am the nurse who will be in charge of the patient today.', korean: '한국어6' },
  { id: '7', chapter: 'Initial Meeting with the Patient.', english: '7I am the nurse who will be in charge of the patient today.', korean: '한국어7' },
  { id: '8', chapter: 'Initial Meeting with the Patient.', english: '8I am the nurse who will be in charge of the patient today.', korean: '한국어8' },
  { id: '9', chapter: 'Initial Meeting with the Patient.', english: '9I am the nurse who will be in charge of the patient today.', korean: '한국어9' },
  { id: '10', chapter: 'Initial Meeting with the Patient.', english: '10I am the nurse who will be in charge of the patient today.', korean: '한국어10' },
  { id: '11', chapter: 'Initial Meeting with the Patient.', english: '11I am the nurse who will be in charge of the patient today.', korean: '한국어11' },
  { id: '12', chapter: 'Initial Meeting with the Patient.', english: '12I am the nurse who will be in charge of the patient today.', korean: '한국어12' },
  { id: '13', chapter: 'Initial Meeting with the Patient.', english: '13I am the nurse who will be in charge of the patient today.', Fkorean: '한국어13' },
];

async function getBookmark() {
  const response = await axios.get<{data: []}>('http://10.0.2.2:8081/api/bookmark');
  try {
    console.log('들어온 데이터', response.data);
  } catch (e) {
    console.log(e);
  }
  return response.data;
}

const Library = ({ navigation }: { navigation: any }) => {
  const [trueCount, setTrueCount] = useState(0);
  const [seletedList, setSeletedList] = useState([]);

  useEffect(()=>{
    const getData = async () => {
      const data = await getBookmark();
      console.log('들어온 데이터', data);
    }
    getData();
  },[]);

  const handleSeletedID = (value: {
    id: string;
    chapter: string;
    english: string;
    korean: string;
  }[]) => {
    setSeletedList(value);
  };

  const handleTureCount = (value: number) => {
    setTrueCount(value);
  };

  const studyPageLoad = () => {
    if (trueCount === 0) {
      navigation.navigate('StudyPage', { data : Data});
    } else {
      
      navigation.navigate('StudyPage', { data : seletedList});
    }
  };

  return (
    <View style={styles.container}>
      <BookMarkList dataArray={Data} seletedBookMarkList={handleSeletedID} trueCount={handleTureCount}/>
      <TouchableOpacity style={styles.btn} onPress={studyPageLoad}>
        <Text style={styles.btnText}>{trueCount === 0 ? '전체 학습하기' : '선택 문장 학습하기'}</Text>
      </TouchableOpacity>
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
    width: screenWidth*0.9,
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

export default Library;
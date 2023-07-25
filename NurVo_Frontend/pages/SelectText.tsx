import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';

// 북마크된 문장
const Data = [
  { id: '1', chapter: 'Initial Meeting with the Patient.', english: '1I am the nurse who will be in charge of the patient today.', korean: '한국어1' },
  { id: '2', chapter: 'Initial Meeting with the Patient.', english: '2I am the nurse who will be in charge of the patient today.', korean: '한국어2' },
  { id: '3', chapter: 'Initial Meeting with the Patient.', english: '3I am the nurse who will be in charge of the patient today.', korean: '한국어3' },
  { id: '4', chapter: 'Initial Meeting with the Patient.', english: '4I am the nurse who will be in charge of the patient today.', korean: '한국어4' },
  { id: '5', chapter: 'Initial Meeting with the Patient.', english: '5I am the nurse who will be in charge of the patient today.', korean: '한국어5' },
  { id: '6', chapter: 'Initial Meeting with the Patient.', english: '6I am the nurse who will be in charge of the patient today.', korean: '한국어6' },
  { id: '7', chapter: 'Initial Meeting with the Patient.', english: '7I am the nurse who will be in charge of the patient today.', korean: '한국어7' },
  { id: '8', chapter: 'Initial Meeting with the Patient.', english: '8I am the nurse who will be in charge of the patient today.', korean: '한국어8' },
  { id: '9', chapter: 'Initial Meeting with the Patient.', english: '9I am the nurse who will be in charge of the patient today.', korean: '한국어9' },
  { id: '10', chapter: 'Initial Meeting with the Patient.', english: '10I am the nurse who will be in charge of the patient today.', korean: '한국어10' },
  { id: '11', chapter: 'Initial Meeting with the Patient.', english: '11I am the nurse who will be in charge of the patient today.', korean: '한국어11' },
  { id: '12', chapter: 'Initial Meeting with the Patient.', english: '12I am the nurse who will be in charge of the patient today.', korean: '한국어12' },
  { id: '13', chapter: 'Initial Meeting with the Patient.', english: '13I am the nurse who will be in charge of the patient today.', korean: '한국어13' },

];


const SelectText = ({ navigation }) => {

  const unitNumber = Data.length;
  // 체크된 개수
  const [trueCount, setTrueCount] = useState(0);
  // 전체 선택 클릭 유무
  const [checkAllTure, setCheckAllTure] = useState(false);
  // 체크된 상태
  const [checkBox, setCheckBox] = useState(Array(unitNumber).fill(false));
  // 체크된 박스 정보
  const [selectBoxInf, setSelectBoxInf] = useState([]);
  // 체크 확인바 보여줄 것인지 안 보여줄 것인지
  const [animationValue] = useState(new Animated.Value(0));

  // 낱개 개수 확인
  const checkedTureCount = (array) => {
    setTrueCount(array.filter(item => item === true).length);
    // 하나하나 선택됐을 때 전체 선택이 됐는지 안됐는지 확인
    const isAllTrue = array.every(item => item === true);
    if (isAllTrue) {
      setCheckAllTure(true);
    } else {
      setCheckAllTure(false);
    }
  };

  // 하나하나 선택시
  const toggleDropdown = (index) => {
    const newArray = [...checkBox];
    newArray[index] = !newArray[index];
    if (newArray[index]) { // 클릭했을 때 ture일 경우
      const newArray = [...selectBoxInf];
      newArray.push(Data[index]);
      setSelectBoxInf(newArray);
    } else {
      const newArray = [...selectBoxInf];
      const idx = newArray.findIndex(item => item.id === `${Data[index].id}`);
      newArray.splice(idx, 1);
      setSelectBoxInf(newArray);
    }
    checkedTureCount(newArray); // 개수 측정
    setCheckBox(newArray); // ture값 반영
  };

  // 전체 선택
  const allchange = () => {
    const newArray = [...checkBox];
    // 배열의 모든 요소가 true인지 확인
    const isAllTrue = newArray.every(item => item === true);
    if (isAllTrue) {
      // 배열의 모든 요소가 true일 때 모든 요소를 false로 변환
      const transformedArray = newArray.map(item => false);
      setCheckBox(transformedArray);
      checkedTureCount(transformedArray);
      setSelectBoxInf([]);
    } else {
      const transformedArray = newArray.map(item => {
        if (item === false) {
          return true;
        } else {
          return item;
        }
      })
      setCheckBox(transformedArray);
      checkedTureCount(transformedArray);
      setSelectBoxInf(Data);
    };
  };

  // 데이터 전달
  const studyPageLoad = () => {
    if (trueCount === 0) { // 전체
      navigation.navigate('StudyPage', { data: Data },);
    } else { // 선택 문장
      navigation.navigate('StudyPage', { data: selectBoxInf });
    }
  };

  useEffect(() => {
    console.log(selectBoxInf);
  }, [selectBoxInf]);

  useEffect(() => {
    // trueCount 상태가 변경될 때 애니메이션 실행
    Animated.timing(animationValue, {
      toValue: trueCount >= 1 ? 1 : 0,
      duration: 500, // 애니메이션 지속 시간 (0.5초)
      useNativeDriver: false, // true일 경우, 네이티브 런타임에 애니메이션을 실행하도록 설정
    }).start();
  }, [trueCount, animationValue]);

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0], // 0과 1의 값에 대한 translateY의 변화량
  });

  return (
    <>
      <ScrollView style={styles.container}>
        <Animated.View style={[styles.menuBar, { transform: [{ translateY }] }]}>
          <Text style={styles.menuText}>✓ {trueCount}개 선택됨</Text>
          <TouchableOpacity onPress={allchange}>
            <Text style={[styles.menuText, checkAllTure || trueCount == unitNumber ? styles.checkedMenuText : null]}>전체 선택</Text>
          </TouchableOpacity>
        </Animated.View>
        {checkBox.map((content, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dropdownItem,
              index + 1 == unitNumber ? styles.lastDropdownItem : null,
              trueCount >= 1 && !content ? styles.unclickDropdownItem : null,
              content ? styles.clickDropdownItem : null,
            ]}
            onPress={() => { toggleDropdown(index) }}>
            <View>
              <Text style={styles.unitcontentText1}>{Data[index].english}</Text>
              <Text style={styles.unitcontentText2}>{Data[index].chapter}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.btn} onPress={studyPageLoad}>
        {trueCount === 0 ? <Text style={styles.btnText}>전체 학습하기</Text> : <Text style={styles.btnText}>선택 문장 학습하기</Text>}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
  dropdownItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 10,
    marginTop: 2,
    marginBottom: 7,
    width: 345,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  lastDropdownItem: {
    marginBottom: 60,
  },
  unclickDropdownItem: {
    opacity: 0.5,
  },
  clickDropdownItem: {
    borderWidth: 1,
    borderColor: 'rgba(98, 196, 150, 1)',
  },
  unitcontentText1: {
    margin: 5,
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  unitcontentText2: {
    margin: 5,
    color: 'gray',
    fontSize: 15,
  },
  btn: {
    position: 'absolute',
    top: 675,
    left: 20,
    width: 345,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(98, 196, 150, 1)',
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default SelectText;

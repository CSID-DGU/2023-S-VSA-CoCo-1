import React, { useRef, useEffect, useState } from 'react';
import { View, Dimensions, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, ViewStyle } from 'react-native';
import Tts from 'react-native-tts';
import Swiper from 'react-native-swiper';
import { DataProps } from './SelectText';
import leftArrow from '../assets/images/leftArow.png';
import rightArow from '../assets/images/rightArow.png'
import { StudyPageProps } from '../utilities/NavigationTypes';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

let cardWidth = screenWidth * 0.8;
let cardHeight = screenHeight * 0.6;

const StudyPage: React.FC<StudyPageProps> = ({ navigation, route }) => {
  // 전달 받은 데이터(suffle)
  const Data = route.params.data;
  // 
  const [count, setCount] = useState(0);
  // 진행도
  const [progress, setProgress] = useState(0);
  // 현 단계 문장 저장
  const [textArray, setTextArray] = useState<DataProps[]>(Data);
  // 다음 단계 문장 저장
  const [nextTextArray, setNextTextArray] = useState<DataProps[]>([]);
  // 카드 앞면, 뒷면
  const [change, setChange] = useState(new Array(textArray.length).fill(false));
  // 다음 단계 넘어가기
  const [isDisabled, setIsDisabled] = useState(false);
  // 현재 카드 번호
  const [currentIndex, setCurrentIndex] = useState(0);
  // const swiperRef = useRef(null);
  const swiperRef = useRef<Swiper>(null);

  useEffect(() => {
    if (isDisabled) {
      setTextArray(nextTextArray);
      setCount(-1);
      setCurrentIndex(-1);
      setNextTextArray([]);
      setIsDisabled(false);
      change.fill(false);
    }
  }, [isDisabled]);

  // alert 창
  const showAlert = () => {
    Alert.alert(
      '한줄학습',
      '목표하신 문장을 모두 복습하셨습니다.',
      [
        { text: '확인', onPress: () => navigation.navigate('SelectText') },
      ],
      { cancelable: false }
    );
  };

  // 카드 뒤집기
  const turnCard = (index: number) => {
    const updatedChange = [...change];
    updatedChange[index] = !updatedChange[index];
    setChange(updatedChange);
  };

  // 화면 전환
  const roof = () => {
    if (swiperRef.current) {
      const swiperState = (swiperRef.current as any).state;
      const totalSlides = swiperState.total;
      if (currentIndex === totalSlides - 1) {
        if (swiperRef.current) {
          swiperRef.current.scrollTo(0, false);
          setIsDisabled(true);
        }
      } else {
        if (swiperRef.current) {
          swiperRef.current.scrollBy(1, true);
        }
      };
    }
  };

  // 다음 단계 문장 제거
  const removeBtn = () => {
    if (currentIndex < textArray.length) {
      setCount(prev => prev + 1);
      setProgress(prev => prev + 1);
      setCurrentIndex(prev => prev + 1);
    }
    roof();
  };

  // 다음 단계 문장 저장
  const keepBtn = () => {
    if (currentIndex >= 0) {
      const newArray = nextTextArray;
      newArray.push(textArray[currentIndex]);
      setNextTextArray(newArray);
    }
    if (currentIndex < textArray.length) {
      setCount(prev => prev + 1);
      setCurrentIndex(prev => prev + 1);
    }
    roof();
  };

  // TTS 실행
  const Speaker = (sample: string) => {
    Tts.speak(sample);
  };

  // 진행바 스타일
  const progressStyle: ViewStyle = {
    width: `${(progress / Data.length) * 100}%`,
    height: '100%',
    backgroundColor: 'rgba(98, 196, 150, 1)',
  };

  // 100% 진행시 Aler창이 뜨고 저장 문장 페이지로 이동
  if (count == -1 && textArray.length == 0) {
    showAlert();
    setTextArray([]);
    setNextTextArray([]);
    setCount(-2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={progressStyle} />
      </View>
      <Swiper
        ref={swiperRef}
        autoplay={false} // 자동 스크롤 비활성화
        showsPagination={false}
        width={screenWidth}
        height={screenHeight * 0.8}
        scrollEnabled={false} >
        {textArray.map((text, index) => (
          <View key={index} style={styles.contentContainer}>
            <TouchableOpacity onPress={() => turnCard(index)}>
              <View style={[styles.textCard, change[index] ? styles.turnTextCard : null]}>
                {!change[index] ? (
                  <Text style={styles.cardText}>{textArray[count === -1 || count === textArray.length? textArray.length-1 : count].english}</Text>
                ) : (
                  <Text style={styles.cardText}>{textArray[count === -1 || count === textArray.length? textArray.length-1 : count].korean}</Text>
                )}
              </View>
              <TouchableOpacity style={styles.speakerButton} onPress={() => Speaker(text.english)}>
                <Text style={styles.speakerButtonText}>🔊</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>
      {currentIndex === -1 ?
        (
          <View style={styles.btnBar}>
            <TouchableOpacity onPress={keepBtn}>
              <Text style={styles.btn2}>계속 반복</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.btnBar}>
            <TouchableOpacity onPress={removeBtn}>
              <View style={styles.btn1}>
                <ImageBackground
                  source={leftArrow}
                  style={styles.img}
                  resizeMode="contain"
                />
                <Text style={styles.btnText}>제거</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={keepBtn}>
              <View style={styles.btn1}>
                <ImageBackground
                  source={rightArow}
                  style={styles.img}
                  resizeMode="contain"
                />
                <Text style={styles.btnText}>유지</Text>
              </View>
            </TouchableOpacity>
          </View >
        )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  progressBar: {
    width: '100%',
    height: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  contentContainer: {
    margin: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: cardWidth,
    height: cardHeight,
    backgroundColor: 'rgba(98, 196, 150, 0.5)',
    borderRadius: 10,
  },
  turnTextCard: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
    borderColor: 'rgb(98, 196, 150)',
  },
  cardText: {
    margin: 5,
    color: 'black',
    fontSize: 20,
  },
  speakerButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    fontSize: 15,
  },
  speakerButtonText: {
    fontSize: 25,
  },
  btnBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 80,
    alignItems: 'center',
    width: '100%',
    height: 100,
    marginVertical: 20
  },
  btn1: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 80,
  },
  btn2: {
    width: 300,
    height: 50,
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'white',
    borderColor: 'rgba(98, 196, 150, 1)',
    borderWidth: 2,
    borderRadius: 5,
    zIndex: 1,
  },
  btnText: {
    position: 'absolute',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    zIndex: 2,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  img: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default StudyPage;

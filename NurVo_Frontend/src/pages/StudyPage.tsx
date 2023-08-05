import { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CardSwiper from '../components/CardSwiper';
import ProgressBar from '../components/ProgressBar';
import CustomAlert from '../components/Alert';
import { screenWidth } from '../utilities/Layout';
import rightArrow from '../assets/images/rightArrow.png';
import leftArrow from '../assets/images/leftArrow.png';

const StudyPage = ({ navigation, route }) => {

  const data = route.params.data;
  const data_length = data.length;
  const [progress, setProgress] = useState(0);
  const [action, setAction] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const handleChangeAction = (value: String) => {
    setAction(value);
  };

  // 제거
  const remove = () => {
    setProgress(prev => prev + 1);
    setAction('remove');
  };

  // 유지
  const keep = () => {
    setAction('keep');
  };

  // Library로 이동
  const handlePage = () => {
    navigation.popToTop();
  }

  return (
    <View style={styles.container}>
      <ProgressBar length={data_length} progress={progress} />
      <CardSwiper
        data={data}
        action={action}
        nextaction={handleChangeAction}
        alertOpen={value => {
          setAlertOpen(value);
        }}
        pageWidth={screenWidth - (10 + 15 + 15) * 2}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={remove}>
          <View style={styles.btnRemove}>
            <Image source={leftArrow} resizeMode="contain" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={keep}>
          <View style={styles.btnKeep}>
            <Image source={rightArrow} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </View >
      {alertOpen &&
        <CustomAlert
          onConfirm={handlePage}
          content='복습 완료! Libray로 이동합니다.'
          confirmText='확인' />
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  btnRemove: {
    fontSize: 50,
    paddingHorizontal: 30,
    paddingVertical: 300,
  },
  btnKeep: {
    fontSize: 50,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    paddingVertical: 300,
  },
});

export default StudyPage;

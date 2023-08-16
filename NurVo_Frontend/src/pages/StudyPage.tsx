import { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../utilities/Color';
import { screenHeight, screenWidth } from '../utilities/Layout';
import CardSwiper from '../components/CardSwiper';
import ProgressBar from '../components/ProgressBar';
import CustomAlert from '../components/Alert';

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
        <TouchableOpacity onPress={remove} style={styles.nextBtn} />
        <TouchableOpacity onPress={keep} style={styles.nextBtn} />
      </View >

      {alertOpen &&
        <CustomAlert
          onConfirm={handlePage}
          content='복습 완료! Libray로 이동합니다.'
          confirmText='확인' />
      }

      <Ionicons 
        name='arrow-undo-outline'
        size={25}
        color={Colors.BLACK}
        onPress={handlePage}
        style={{marginHorizontal: 20, marginVertical: 40}}
      />
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
  nextBtn: {
    paddingHorizontal: 25,
    paddingVertical: screenHeight,
  },
});

export default StudyPage;

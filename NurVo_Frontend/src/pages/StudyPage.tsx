import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CardSwiper from '../components/CardSwiper';
import ProgressBar from '../components/ProgressBar';
import CustomAlert from '../components/Alert';

function StudyPage({ navigation, route }): React.JSX.Element {

  const data = route.params.data;
  const data_length = data.length;
  const [progress, setProgress] = useState(0);
  const [action, setAction] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const handleChangeAction = (value: React.SetStateAction<string>) => {
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
    navigation.navigate('Library');
  }

  return (
    <View style={styles.container}>
      <ProgressBar length={data_length} progress={progress} />
      <CardSwiper data={data} action={action} nextaction={handleChangeAction} alertOpen={(value) => { setAlertOpen(value) }} />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={remove}>
          <Text style={styles.btn1}>완료</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={keep}>
          <Text style={styles.btn1}>다음</Text>
        </TouchableOpacity>
      </View>
      {alertOpen &&
        <CustomAlert
          onConfirm={handlePage}
          content='복습 완료! Libray로 이동합니다.'
          confirmText='확인' />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  btn1: {
    marginVertical: 20,
    marginHorizontal: 30,
  }
});

export default StudyPage;

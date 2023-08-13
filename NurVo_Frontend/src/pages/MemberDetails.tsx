import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../utilities/Color';
import { Body012 } from '../utilities/Fonts';
import { screenWidth, screenHeight } from '../utilities/Layout';
import MemberDetailCell from '../components/MemberDetailCell';
import CustomAlert from '../components/Alert';

import img1 from '../assets/images/기본이미지.png';

const member = {
  id: 'ajtwoddl0425',
  name: '박혜림',
  phone_number: '010-2202-2878',
  email: 'ajtwoddl0425@naver.com',
  nickname: 'nalteng',
  obj: 6,
  obj_date: '2020.12.19',
}

const MenberDetails = ({ navigation, route }) => {
  const [userdata, setUserdate] = useState(member);
  const [alertOpen, setAlertOpen] = useState('');

  useEffect(() => {
    if (route.params) {
      setUserdate((prev) => ({
        ...prev,
        obj: route.params.data.obj,
        obj_date: route.params.data.obj_date,
      }));
    }
  }, [route.params]);
  
  const openSetUserGoal = () => {
    navigation.navigate('SetUserGoal', { data: { obj: userdata.obj, obj_date: userdata.obj_date } });
  }

  const logoutAction = () => {
    setAlertOpen('logout');
  }

  const deleteAction = () => {
    setAlertOpen('deleteUser');
  }

  const handleCancle = () => {
    setAlertOpen('');
  }

  const handleNext = (value: boolean) => {
    if (value) console.log("로그아웃 되셨습니다.");
    else console.log("회원 탈퇴가 완료되셨습니다.");
    setAlertOpen('');
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image source={img1} style={styles.img1} />
          </View>

          <TouchableOpacity onPress={openSetUserGoal}>
            <MemberDetailCell title='시용자 목표 설정' infor={`${userdata.obj} Chapter / Week (${userdata.obj_date})`} isOpenIcon={true} />
          </TouchableOpacity>
          <MemberDetailCell title='이름' infor={userdata.name} />
          <MemberDetailCell title='닉네임' infor={userdata.nickname} />
          <MemberDetailCell title='아이디(이메일)' infor={`${userdata.id} (${userdata.email})`} />
          <MemberDetailCell title='휴대폰 번호' infor={userdata.phone_number} />

          <TouchableOpacity style={styles.alertButton} onPress={logoutAction}>
            <View style={styles.buttonInner} >
              <Body012 text='로그아웃' color={Colors.GRAY03} />
              <Ionicons name='chevron-forward-outline' size={14} color={Colors.GRAY05} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.alertButton} onPress={deleteAction}>
            <View style={styles.buttonInner} >
              <Body012 text='회원탈퇴' color={Colors.GRAY03} />
              <Ionicons name='chevron-forward-outline' size={14} color={Colors.GRAY05} />
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
      {alertOpen === 'logout' ? (
        <CustomAlert
          onCancle={handleCancle}
          onConfirm={() => handleNext(true)}
          content='로그아웃 하시겠습니까?'
          cancleText='취소'
          confirmText='확인' />
      ) : (
        alertOpen === 'deleteUser' ? (
          <CustomAlert
            onCancle={handleCancle}
            onConfirm={() => handleNext(false)}
            content='정말로 탈퇴 하시겠습니까?'
            cancleText='취소'
            confirmText='확인' />
        ) : null
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.03,
  },
  img1: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
  },
  alertButton: {
    marginHorizontal: 10,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY09,
  },
  buttonInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: 15,
  }
});

export default MenberDetails;
import { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import Colors from '../utilities/Color';
import { Body011, Title01 } from '../utilities/Fonts';
import { screenWidth } from '../utilities/Layout';
import SignUpCell from '../components/SignUpCell';
import CustomAlert from '../components/Alert';
import EncryptedStorage from 'react-native-encrypted-storage';

const MainPage = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isAlret, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const onSubmit = async() => {
    console.log("로그인");
    // if (userId === "coco1111" && userPassword === "coco1111") {
    //   try {
    //     await EncryptedStorage.setItem(
    //       "accessToken123",
    //       JSON.stringify({
    //         age: 22,
    //         token: "ACCESS_sTOKEN",
    //         username: "cocos",
    //       })
    //     );
    //     // Congrats! You've just stored your first value!
    //   } catch (error) {
    //     // There was an error on the native side
    //   }
    } else if (userId === '' || userPassword === '') {
      setAlertMessage('아이디와 비밀번호를 모두 입력해주세요.');
      setIsAlert(true);
    } else {
      setAlertMessage('아이디나 비밀번호가 일치하지 않습니다.');
      setIsAlert(true);
    }
  }

  const handleAlertClose = () => {
    setIsAlert(false);
  }

  return (
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <Title01 text='Welcome Back NURVO!' color={Colors.BLACK} />
      </View>

      <View style={{ display: 'flex', marginHorizontal: 10, width: screenWidth }}>
        <SignUpCell
          title='아이디'
          initialText='아이디'
          onText={setUserId}
        />
        <SignUpCell
          title='비밀번호'
          initialText='비밀번호'
          onText={setUserPassword}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.btn, styles.loginBtn]} onPress={onSubmit}>
          <Body011 text='로그인' color={Colors.WHITE} style={{ textAlign: 'center' }} />
        </TouchableOpacity>
      </View>

      {isAlret &&
        <CustomAlert
          onConfirm={handleAlertClose}
          content={alertMessage}
          confirmText='확인' />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: screenWidth,
  },
  btn: {
    marginHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.MAINGREEN,
  },
  loginBtn: {
    backgroundColor: Colors.MAINGREEN,
  },
});

export default MainPage;
import { useState, useEffect, useContext, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, NativeModules } from 'react-native';

import Colors from '../utilities/Color';
import { Body011, Title01 } from '../utilities/Fonts';
import { screenWidth } from '../utilities/Layout';
import { storeUserSession } from '../utilities/EncryptedStorage';
import { fetchLogin, fetchMypage } from '../utilities/ServerFunc';
import SignUpCell from '../components/SignUpCell';
import CustomAlert from '../components/Alert';
import UserContext from '../utilities/UserContext';

const { StatusBarManager } = NativeModules;

const getUserData = async () => {
  try {
    const user = await fetchMypage();
    return user;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
}

const MainPage = ({ navigation, route }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isAlret, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { isLogged, setIsLogged } = useContext(UserContext);

  // 로그인
  useEffect(() => {
    async function Login() {
      console.log("login")
      try {
        console.log("userId: ", userId, "userPassword: ", userPassword);
        const result = await fetchLogin({
          "userId": userId,
          "password": userPassword,
        });
        if (typeof result === 'string' && result === "Invalid username or password") {
          setAlertMessage('아이디 혹은 비밀번호를 올바르게 입력해주세요.');
          setIsAlert(true);
        } else {
          console.log("받은 토큰: ", result.token);
          await storeUserSession(result.token);
          const userdate = await getUserData();
          // firstLogin(userdate.obj, userdate.obj_date);
          handleLogin();
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    if (isLogin) {
      Login();
      setIsLogin(false);
    }
  }, [isLogin]);

  const onSubmit = async () => {
    if (userId === '' || userPassword === '') {
      setAlertMessage('아이디와 비밀번호를 모두 입력해주세요.');
      setIsAlert(true);
    } else {
      setIsLogin(true);
    }
  }

  const handleAlertClose = () => {
    setIsAlert(false);
  }
  const handleLogin = () => {
    // 로그인 처리
    setIsLogged(true);
  };

  const firstLogin = (value: any, value2: any) => {
    if (value === null && value2 === null) {
      navigation.navigate('SetUserGoalInital', { data: { obj: 1, obj_date: formatDate(Date.now()) }, prevScreen: 'Login' });
    } else {
      navigation.navigate('HomeScreen');
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? StatusBarManager.HEIGHT + 44 : undefined}>
      <View style={styles.container}>

        <View style={styles.textContainer}>
          <Title01 text='Welcome Back NURVO!' color={Colors.BLACK} />
        </View>

        <View style={{ display: 'flex', marginHorizontal: 10, width: screenWidth }}>
          <SignUpCell
            title='아이디'
            initialText='아이디'
            onText={setUserId}
            isFocused={true}
          />
          <SignUpCell
            title='비밀번호'
            initialText='비밀번호'
            onText={setUserPassword}
            isFocused={false}
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
    </KeyboardAvoidingView>
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
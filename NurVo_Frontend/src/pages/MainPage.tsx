import { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../utilities/Color';
import { Body011, Title01 } from '../utilities/Fonts';
import { screenWidth } from '../utilities/Layout';

import logo from '../assets/images/logo2.png';

const MainPage = ({ navigation }: { navigation: any }) => {

  const goLogin = () => {
    navigation.navigate('Login');
  }

  const goSignUp = () => {
    navigation.navigate('SignUp');
  }

  return (
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Title01 text='NUR' color={Colors.MAINGREEN} />
          <Title01 text='se ' color={Colors.BLACK} />
          <Title01 text='VO' color={Colors.MAINGREEN} />
          <Title01 text='ice' color={Colors.BLACK} />
        </View>
        <Body011 text='간호 실무 영어 회화 어플' color={Colors.BLACK} />
      </View>

      <Image source={logo} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.btn, styles.loginBtn]} onPress={goLogin}>
          <Body011 text='로그인' color={Colors.WHITE} style={{ textAlign: 'center' }} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.signUpBtn]} onPress={goSignUp}>
          <Body011 text='회원가입' color={Colors.BLACK} style={{ textAlign: 'center' }} />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  signUpBtn: {
    backgroundColor: Colors.WHITE,
  },
});

export default MainPage;

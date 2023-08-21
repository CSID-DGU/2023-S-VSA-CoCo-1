import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as yup from 'yup';
import axios from 'axios';

import Colors from '../utilities/Color';
import { Body011 } from '../utilities/Fonts';
import { RN_HOST_URL } from "@env";

import SignUpCell from '../components/SignUpCell';
import IndentifyModal from '../components/IndentifyModal';
import CustomAlert from '../components/Alert';

interface SignUpData {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone_number: string;
  nickname: string;
}

const SignUp = ({ navigation }) => {
  const [id, setId] = useState(''); //input으로 입력받고 여기에 저장한 뒤 백엔드로 보내주는 값들
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [checkId, setCheckId] = useState(false); //아이디 중복이 아닐 때 true로 바뀜 - true일 경우에 버튼 비활 되도록 설정 -> Pressable의 disabled 속성 사용
  const [identifyNumber, setIdentifyNumber] = useState(''); //백엔드 측에서 전달받은 인증번호
  const [checkIdentifyNumber, setCheckIdentifyNumber] = useState(''); //사용자가 입력하는 인증번호
  const [identify, setIdentify] = useState(false); //인증번호가 일치할 때 true로 바뀜
  const [isIdentifyModal, setIsIdentifyModal] = useState(false); // 인증번호 확인 모달창
  const [isAlretAction, setIsAlretAction] = useState(false); // 회원가입 가능 여부 확인 Alert창
  const [alretMessages, setAlretMessages] = useState(''); // Alert창에 들어갈 메세지

  // 유효성 검사를 위한 스키마 정의
  const validationSchema = yup.object().shape({
    id: yup.string().required('아이디를 입력해주세요.'),
    password: yup
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .matches(
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        '비밀번호는 영어 소문자, 숫자, 특수 기호를 모두 포함해야 합니다.'
      )
      .required('비밀번호를 입력해주세요.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ""], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 다시 입력해주세요.'),
    name: yup.string().required('이름을 입력해주세요.'),
    phone_number: yup.string().required('전화번호를 입력해주세요.'),
    nickname: yup.string().required('닉네임을 입력해주세요.'),
  });

  //중복된 아이디인지 확인하는 함수
  const handleCheckId = async () => {
    if (id === '') {
      setAlretMessages('아이디를 입력해주세요.');
      setIsAlretAction(true);
    } else {
      const checkIdData = {
        id,
      }
      try {
        const result = await axios.post(`${RN_HOST_URL}/api/signup/id`, checkIdData);
        if (result.data.message === '사용 가능한 아이디입니다.') {
          setCheckId(true);
          setAlretMessages(result.data.message);
          setIsAlretAction(true);
        } else {
          setCheckId(false);
          setAlretMessages('이미 사용중인 아이디입니다');
          setIsAlretAction(true);
        }
      } catch (e) {
        console.log(e);
      };
    }
  }

  //전화번호 인증을 위한 인증번호
  const handleCheckIdentify = async () => {
    const identifyData = {
      phone_number,
    }
    try {
      const result = await axios.post(`${RN_HOST_URL}/api/signup/identify`, identifyData);
      setIdentifyNumber(result.data.Number);
    } catch (e) {
      console.log(e);
    }
  }

  //사용자가 인증번호 입력했을 때의 함수
  const handleCheckIdentifyNumber = () => {
    if (checkIdentifyNumber.length === 6) {
      if (checkIdentifyNumber.includes(identifyNumber)) {
        setIsIdentifyModal(false);
        setIdentify(true);
      }
    }
  }

  //회원가입 폼 제출할 때의 함수
  const handleSignUp = async () => {
    const signUpData: SignUpData = {
      id,
      password,
      confirmPassword,
      name,
      phone_number,
      nickname,
    };

    try {
      await validationSchema.validate(signUpData, { abortEarly: false });
      // 유효성 검사를 통과한 경우, 회원가입 처리 로직을 실행합니다.
      const result = await axios.post(`${RN_HOST_URL}/api/signup`, signUpData);
      if (result.data.message === '회원가입 성공') {
        navigation.navigate('MainPage');
      }
    } catch (e) {
      const errorMessages = e.inner[0]?.message; // 에러메시지가 뜰 것임 그러면 그에 맞게 사용자에게 다시 입력해달라고 하면 됨
      setAlretMessages(errorMessages);
      setIsAlretAction(true);
    } 
  };

  useEffect(() => {
    console.log('입력: ', checkIdentifyNumber);
  }, [checkIdentifyNumber]);

  const onClick = (value: string) => {
    if (value === '중복확인') {
      handleCheckId();
    } else if (value === '인증번호 전송') {
      console.log(value);
      handleCheckIdentify();
      setIsIdentifyModal(true);
    } else if (value === '인증번호 확인') {
      console.log(value);
      handleCheckIdentifyNumber();
    }
  }

  const handleAlertClose = () => {
    setIsAlretAction(false);
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: 'padding' })}
        style={styles.container}
      >
        <SignUpCell
          title="아이디"
          initialText="아이디"
          isConfirmButton={true}
          buttonText="중복확인"
          onText={value => setId(value)}
          onClickAction={onClick}
          isButtonDisable={checkId}
        />
        <SignUpCell
          title="비밀번호"
          initialText="비밀번호"
          onText={value => setPassword(value)}
          subText='영어 소문자, 숫자, 특수 기호(!@#$%^&*)을 포함한 8자 이상'
        />
        <SignUpCell
          title="비밀번호 확인"
          initialText="비밀번호 확인"
          onText={value => setConfirmPassword(value)}
        />
        <SignUpCell
          title="이름"
          initialText="이름을 입력하세요"
          onText={value => setName(value)}
        />
        <SignUpCell
          title="휴대폰 번호"
          initialText="'-' 구분없이 입력"
          isConfirmButton={true}
          buttonText="인증번호 전송"
          onText={(value) => setPhoneNumber(value)}
          onClickAction={onClick}
          isButtonDisable={identify}
        />
        <SignUpCell
          title="닉네임"
          initialText="닉네임을 입력하세요"
          onText={value => setNickname(value)}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
        <Body011 text='NurVo 시작하기' color={Colors.WHITE} style={{ textAlign: 'center' }} />
      </TouchableOpacity>

      <IndentifyModal
        isAction={isIdentifyModal}
        onText={(value: string) => setCheckIdentifyNumber(value)}
        onClose={(value: boolean) => setIsIdentifyModal(value)}
        onConfirmText={onClick}
        isIndenify={identify}
      />

      {isAlretAction &&
        <CustomAlert
          onConfirm={handleAlertClose}
          content={alretMessages}
          confirmText='확인' />
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: Colors.MAINGREEN,
  },
})

export default SignUp;

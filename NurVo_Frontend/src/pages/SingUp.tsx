import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Button, StyleSheet } from 'react-native';
import * as yup from 'yup';
import Colors from '../utilities/Color';
import {Body012, Subtext011} from '../utilities/Fonts';
import { screenWidth } from '../utilities/Layout';
import axios from 'axios';


interface SignUpData {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone_number: string;
  nickname: string;
}

const SignUpForm: React.FC = () => {
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
    const checkIdData = {
      id
    }
    try {
      const result = await axios.post('http://10.0.2.2:5000/api/signup/id', checkIdData);
      if (result.data === '사용 가능한 아이디입니다.') {
        setCheckId(true);
      } else {
        setCheckId(false);
        // alert('이미 사용중인 아이디입니다.');
      }
    } catch (e) {
      console.log(e);
    };
  }

  //전화번호 인증을 위한 인증번호
  const handleCheckIdentify = async () => {
    const identifyData = {
      phone_number
    }
    try {
      const result = await axios.post('http://10.0.2.2:5000/api/signup/idendify', identifyData);
      setIdentifyNumber(result.data.Number);
    }catch(e) {
      console.log(e);
    }
  }

  //사용자가 인증번호 입력했을 때의 함수
  const handleCheckIdentifyNumber = () => {
    if(checkIdentifyNumber.length === 6) {
      if(checkIdentifyNumber === identifyNumber) {
        setIdentify(true);
      } else {
        //비밀번호를 다시 입력해주세요 창 띄움
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
      const result = await axios.post('http://10.0.2.2:5000/api/signup', signUpData);
      if(result.data === '회원가입 성공') {
        //다음 로직 실행
      }
    } catch (e) {
      const errorMessages = e.inner.map(error => error.message); // 에러메시지가 뜰 것임 그러면 그에 맞게 사용자에게 다시 입력해달라고 하면 됨

      
    }
  };

  return (
    <View>
      
    </View>
  );
};

export default SignUpForm;



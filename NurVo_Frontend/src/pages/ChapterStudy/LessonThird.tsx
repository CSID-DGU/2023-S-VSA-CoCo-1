import React, { useState, useRef, useEffect, useReducer } from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Animated,
} from 'react-native';

import Colors from '../../utilities/Color';
import { Message, allMessages } from '../../utilities/LessonExample';
import ChatBubble, { ChatBubbleInputAll } from '../../components/ChatBubble';
import CustomAlert from '../../components/Alert';
import VoiceRecordButton from '../../components/VoiceFuncComp';

const { StatusBarManager } = NativeModules;

export default function LessonSecond({ navigation }: { navigation: any }) {
  //키보드 높이 계산
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        dispatch({ type: 'SET_KEYBOARD_HEIGHT', payload: event.endCoordinates.height });
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100)
      }
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      (event) => {
        dispatch({ type: 'SET_KEYBOARD_HEIGHT', payload: event.endCoordinates.height });
        console.log(keyboardHeight);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

//SECTION - useState
  const initialState = {
    messages: [allMessages[0]],
    inputText: '',
    correctPercent: '',
    keyboardHeight: 0,
    showNextAlert: false,
    showCheckAlert: false,
    isVoiceMode: true,
  };
  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'SET_MESSAGES':
        return { ...state, messages: action.payload };
      case 'SET_INPUT_TEXT':
        return { ...state, inputText: action.payload };
      case 'SET_CORRECT_PERCENT':
        return { ...state, correctPercent: action.payload };
      case 'SET_KEYBOARD_HEIGHT':
        return { ...state, keyboardHeight: action.payload };
      case 'SET_SHOW_NEXT_ALERT':
        return { ...state, showNextAlert: action.payload };
      case 'SET_SHOW_CHECK_ALERT':
        return { ...state, showCheckAlert: action.payload };
      case 'SET_IS_VOICE_MODE':
        return { ...state, isVoiceMode: action.payload };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const { messages, inputText, correctPercent, keyboardHeight, showNextAlert, showCheckAlert, isVoiceMode } = state;

  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isVoiceMode) {
      Keyboard.dismiss();
      inputRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [isVoiceMode]);

//SECTION - 입력 관련 함수들
  //현재 마지막 문장이 입력창을 가지고 있는지 계산
  const hasInputText = messages[messages.length - 1].speaker === 'Nurse' && messages[messages.length - 1].second_step;
  const [buttonTranslateY] = useState(new Animated.Value(100));
  //입력창이 존재하면 버튼이 올라오고, 입력창이 없으면 내려가는 애니메이션
  useEffect(() => {
    Animated.timing(buttonTranslateY, {
      toValue: hasInputText ? 0 : 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [hasInputText]);
  //입력창에 입력된 텍스트를 state에 저장하는 함수 -> ChatBubbleInputAll로 전달하기 위해 함수형으로 구현
  const handleSetInputText = (text: string) => dispatch({ type: 'SET_INPUT_TEXT', payload: text });
  //다음 문장으로 넘어가는 함수 -> 입력창 X
  const handlePress = () => {
    if (messages.length < allMessages.length) {
      if (messages[messages.length - 1].speaker === 'Nurse' && messages[messages.length - 1].second_step) {

        if (inputText.trim().length === 0) {
          inputRef.current?.focus();
          return;
        } else {
          console.log(inputText);
          dispatch({ type: 'SET_SHOW_CHECK_ALERT', payload: true });
        }
      } else {
        dispatch({ type: 'SET_MESSAGES', payload: allMessages.slice(0, messages.length + 1) });
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
      }
    } else {
      dispatch({ type: 'SET_SHOW_NEXT_ALERT', payload: true });
    }
  };
  //다음 문장으로 넘어가는 함수 -> 입력창 O
  const handleSend = () => {
    handlePress();
    flatListRef.current?.scrollToEnd({ animated: true });
  };

//SECTION - Alert
  useEffect(() => {
    if (!showCheckAlert && messages[messages.length - 1].speaker === 'Nurse') {
      inputRef.current?.focus();
    }
  }, [showCheckAlert]);
  // 알림창 확인버튼 - 다음 화면으로 넘어가는 함수
  const handleNext = () => {
    navigation.popToTop();
  };
  // 알림창 취소버튼
  const handleCancle = () => dispatch({ type: 'SET_SHOW_NEXT_ALERT', payload: false });
  // 입력확인 알림창 확인버튼 - 입력창 초기화, 다음 문장으로 넘어가는 함수
  const handleCheckNext = () => {
    dispatch({ type: 'SET_INPUT_TEXT', payload: '' });
    dispatch({ type: 'SET_SHOW_CHECK_ALERT', payload: false });
    dispatch({ type: 'SET_MESSAGES', payload: allMessages.slice(0, messages.length + 1) });
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };
  // 입력확인 알림창 취소버튼 - 입력창에 포커스
  const handleCheckCancle = () => dispatch({ type: 'SET_SHOW_CHECK_ALERT', payload: false });

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingBottom: keyboardHeight - 50 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? StatusBarManager.HEIGHT + 44 : undefined}
    >
      <FlatList
        style={{ flex: 1, paddingHorizontal: 20, marginBottom: isVoiceMode ? 0 : 50 }}
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={handlePress} activeOpacity={1}>
            {hasInputText ? (
              <ChatBubbleInputAll
                item={item}
                isBookmarked={false}
                onEnterValue={handleSend}
                onChagneText={handleSetInputText}
                inputRef={inputRef}
                input={inputText}
                isVoiceMode={isVoiceMode}
                isLastItem={index === messages.length - 1}
              />
            ) : (
              <ChatBubble item={item} isBookmarked={false} />
            )}
          </TouchableOpacity>
        )}
      />
      <Animated.View style={{ transform: [{ translateY: buttonTranslateY }] }}>
        <VoiceRecordButton
          dispatch={dispatch}
          isVoiceMode={isVoiceMode}
        />
      </Animated.View>
      {showNextAlert &&
        <CustomAlert
          onCancle={handleCancle}
          onConfirm={handleNext}
          content={`학습을 완료했습니다.`}
          confirmText='확인' />}
      {showCheckAlert &&
        <CustomAlert
          onCancle={handleCheckCancle}
          onConfirm={handleCheckNext}
          content={`정답률이 %입니다. \n다음으로 넘어가시겠습니까?`}
          cancleText='다시하기'
          confirmText='넘어가기' />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.BACKGROUND
  },
});


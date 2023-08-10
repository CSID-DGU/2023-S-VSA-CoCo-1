import React, { useState, useRef, useEffect, useReducer } from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  LogBox,
} from 'react-native';

import Colors from '../../utilities/Color';
import { Message, allMessages } from '../../utilities/LessonExample';
import ChatBubble from '../../components/ChatBubble';
import CustomAlert from '../../components/Alert';
import { speech, stopSpeech } from '../../utilities/TextToSpeech';

const { StatusBarManager } = NativeModules;
LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function LessonFirst({ navigation }: { navigation: any }) {
  const flatListRef = useRef<FlatList>(null);
  // const [messages, setMessages] = useState<Message[]>([allMessages[0]]);
  // const [showAlert, setShowAlert] = useState(false);
  // const [isSpeaking, setIsSpeaking] = useState<boolean[]>([]);
  const initialState = {
    messages: [allMessages[0]],
    showAlert: false,
    isSpeaking: [],
  };

  const reducer = (state: typeof initialState, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case 'SET_MESSAGES':
        return { ...state, messages: action.payload };
      case 'SET_SHOW_ALERT':
        return { ...state, showAlert: action.payload };
      case 'SET_IS_SPEAKING':
        return { ...state, isSpeaking: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    messages,
    showAlert,
    isSpeaking,
  } = state;

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  useEffect(() => {
    setIsSpeakingByIndex(0, true);
    speech(
      allMessages[0].dialogue,
      allMessages[0].chapter_id,
      allMessages[0].id,
      allMessages[0].speaker === 'Nurse',
      () => setIsSpeakingByIndex(0, false));    //speech함수가 끝나면 setIsSpeaking(false)로 바꿔줌
  }, []);

  const handlePress = () => {
    if (isSpeaking.some((value: boolean) => value)) {
      return;
    } else {
      if (messages.length < allMessages.length) {
        dispatch({ type: 'SET_MESSAGES', payload: allMessages.slice(0, messages.length + 1) });
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

        setIsSpeakingByIndex(messages.length, true);

        speech(
          allMessages[messages.length].dialogue,
          allMessages[messages.length].chapter_id,
          allMessages[messages.length].id,
          allMessages[messages.length].speaker === 'Nurse',
          () => setIsSpeakingByIndex(messages.length, false));    //speech함수가 끝나면 setIsSpeaking(false)로 바꿔줌
      } else {
        dispatch({ type: 'SET_SHOW_ALERT', payload: true });
      }
    }
  };

  const setIsSpeakingByIndex = (index: number, bool: boolean) => {
    const speakingList: boolean[] = [...isSpeaking];
    speakingList[index] = bool;
    dispatch({ type: 'SET_IS_SPEAKING', payload: speakingList });
  };

  const handleNext = () => {
    navigation.pop();
    navigation.navigate("LessonSecondScreen");
  };

  const handleCancle = () => {
    dispatch({ type: 'SET_SHOW_ALERT', payload: false });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? StatusBarManager.HEIGHT + 44 : undefined}
    >
      <FlatList
        style={{ flex: 1, paddingHorizontal: 20 }}
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={handlePress} activeOpacity={1}>
            <ChatBubble
              index={index}
              item={item}
              isBookmarked={false}
              isSpeaking={isSpeaking[index]}
              speakingList={isSpeaking}
              onIsClickSpeakChange={(isSpeaking) => setIsSpeakingByIndex(index, isSpeaking)} />
          </TouchableOpacity>
        )}
      />
      {showAlert &&
        <CustomAlert
          onCancle={handleCancle}
          onConfirm={handleNext}
          content='1단계 학습을 완료했습니다. 2단계 학습을 시작하시겠습니까?'
          cancleText='취소'
          confirmText='확인' />}
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


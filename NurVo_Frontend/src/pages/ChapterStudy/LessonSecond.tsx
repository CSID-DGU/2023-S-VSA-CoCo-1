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
// import { Message, allMessages } from '../../utilities/LessonExample';
import { ChatBubbleInputWord } from '../../components/ChatBubble';
import CustomAlert from '../../components/Alert';
import VoiceRecordButton from '../../components/VoiceFuncComp';
import { stopSpeech } from '../../utilities/TextToSpeech';
import { LessonSecondProps } from '../../utilities/NavigationTypes';
import { calculateSecondStepAccuracyWithSentenceId, fetchChapterDialogueSecondStepById, fetchChapterDialogueThirdStepById } from '../../utilities/ServerFunc';

const { StatusBarManager } = NativeModules;

export default function LessonSecond({ navigation, route }: LessonSecondProps) {

  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  type State = {
    allMessages: [];
    messages: [];
    inputText: string;
    inputValues: Record<string, any>;
    correctPercent: string;
    keyboardHeight: number;
    showNextAlert: boolean;
    showCheckAlert: boolean;
    isVoiceMode: boolean;
    isSpeaking: boolean[];
  };

  const initialState: State = {
    allMessages: [],
    messages: [],
    inputText: '',
    inputValues: {},
    correctPercent: '',
    keyboardHeight: 0,
    showNextAlert: false,
    showCheckAlert: false,
    isVoiceMode: true,
    isSpeaking: [],
  };

  const reducer = (state: typeof initialState, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case 'SET_ALLMESSAGES':
        return { ...state, allMessages: action.payload };
      case 'SET_MESSAGES':
        return { ...state, messages: action.payload };
      case 'SET_INPUT_TEXT':
        return { ...state, inputText: action.payload };
      case 'SET_INPUT_VALUES':
        return { ...state, inputValues: action.payload };
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
      case 'SET_IS_SPEAKING':
        return { ...state, isSpeaking: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    allMessages,
    messages,
    inputText,
    inputValues,
    correctPercent,
    keyboardHeight,
    showNextAlert,
    showCheckAlert,
    isVoiceMode,
    isSpeaking,
  } = state;

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const chapterId = route.params.chapterId;
      const data = await fetchChapterDialogueSecondStepById(chapterId);
      if (data) {
        dispatch({ type: 'SET_ALLMESSAGES', payload: data });
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (allMessages.length > 0) {
      dispatch({ type: 'SET_MESSAGES', payload: [allMessages[0]] });
    }
  }, [allMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      if (!showCheckAlert && messages[messages.length - 1].speaker === 'Nurse') {
        inputRef.current?.focus();
      }
    }
  }, [showCheckAlert]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        dispatch({ type: 'SET_KEYBOARD_HEIGHT', payload: event.endCoordinates.height });
        flatListRef.current?.scrollToEnd({ animated: true });
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
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isVoiceMode) {
      Keyboard.dismiss();
      inputRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100)
  }, [isVoiceMode]);

  const handleSetInputText = (text: string) => {
    dispatch({ type: 'SET_INPUT_TEXT', payload: text });
  };

  const handlePress = async () => {
    if (!(isSpeaking.some((value: boolean) => value))) {
      if (messages.length < allMessages.length) {
        if (messages[messages.length - 1].speaker === 'Nurse' && messages[messages.length - 1].second_step) {
          if (inputText.trim().length === 0) {
            inputRef.current?.focus();
            return;
          } else {
            await calculateCorrectPercent();
            dispatch({ type: 'SET_SHOW_CHECK_ALERT', payload: true });
          }
        } else {
          dispatch({ type: 'SET_MESSAGES', payload: allMessages.slice(0, messages.length + 1) });
          setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        }
      } else {
        if (messages[messages.length - 1].speaker === 'Nurse' && messages[messages.length - 1].second_step) {
          await calculateCorrectPercent();
          dispatch({ type: 'SET_SHOW_CHECK_ALERT', payload: true });
        }
        dispatch({ type: 'SET_SHOW_NEXT_ALERT', payload: true });
      }
    }
  };

  async function calculateCorrectPercent() {
    const result = await calculateSecondStepAccuracyWithSentenceId(route.params.chapterId, messages[messages.length - 1].id, inputText)
    if (result) {
      dispatch({ type: 'SET_CORRECT_PERCENT', payload: result.accuracy });
    }

  }

  const setIsSpeakingByIndex = (index: number, bool: boolean) => {
    const speakingList: boolean[] = [...isSpeaking];
    speakingList[index] = bool;
    dispatch({ type: 'SET_IS_SPEAKING', payload: speakingList });
  };

  const handleSend = () => {
    handlePress();
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleNext = () => {
    navigation.pop();
    navigation.navigate("LessonThirdScreen", { chapterId: route.params.chapterId });
  };
  const handleCancle = () => {
    dispatch({ type: 'SET_SHOW_NEXT_ALERT', payload: false });
  };
  const handleCheckNext = () => {
    const jsonValue = { text: inputText, isOver: correctPercent >= 80 ? true : false}
    const newInputValues = { ...inputValues, [messages[messages.length - 1].id]:  JSON.stringify(jsonValue)};
    dispatch({ type: 'SET_INPUT_VALUES', payload: newInputValues });
    dispatch({ type: 'SET_INPUT_TEXT', payload: '' });
    dispatch({ type: 'SET_SHOW_CHECK_ALERT', payload: false });
    dispatch({ type: 'SET_MESSAGES', payload: allMessages.slice(0, messages.length + 1) });
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };
  const handleCheckCancle = () => {
    dispatch({ type: 'SET_SHOW_CHECK_ALERT', payload: false });
  };

  const hasInputText = messages.length > 0 ? messages[messages.length - 1].speaker === 'Nurse' &&
    messages[messages.length - 1].second_step : false;

  // 하단 키보드 버튼 애니메이션
  const [buttonTranslateY] = useState(new Animated.Value(140));
  useEffect(() => {
    Animated.timing(buttonTranslateY, {
      toValue: hasInputText ? 0 : 140,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [hasInputText]);

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
          <TouchableOpacity key={index.toString()} onPress={handlePress} activeOpacity={1}>
            <ChatBubbleInputWord
              key={index.toString()}
              index={index}
              item={item}
              isBookmarked={false}
              onEnterValue={handleSend}
              onChagneText={handleSetInputText}
              inputRef={inputRef}
              input={inputText}
              inputValues={inputValues}
              isVoiceMode={isVoiceMode}
              isLastItem={index === messages.length - 1}
              isSpeaking={isSpeaking[index]}
              speakingList={isSpeaking}
              onIsClickSpeakChange={(isSpeaking) => setIsSpeakingByIndex(index, isSpeaking)}
            />
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
          content={`2단계 학습을 완료했습니다. \n3단계 학습을 시작하시겠습니까?`}
          cancleText='취소'
          confirmText='확인' />}
      {showCheckAlert &&
        <CustomAlert
          onCancle={handleCheckCancle}
          onConfirm={handleCheckNext}
          content={`정답률이 ${correctPercent}%입니다. \n다음으로 넘어가시겠습니까?`}
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


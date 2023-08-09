import React, { useState, useRef, useEffect } from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  TextInput,
  View,
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

  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);
  const [messages, setMessages] = useState<Message[]>([allMessages[0]]);
  const [inputText, setInputText] = useState('');
  const [correctPercent, setCorrectPercent] = useState('');
  const [keyboardHeight, setkeyboardHeight] = useState(0);
  const [showNextAlert, setShowNextAlert] = useState(false);
  const [showCheckAlert, setShowCheckAlert] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean[]>([]);

  useEffect(() => {
    if (!showCheckAlert && messages[messages.length - 1].speaker === 'Nurse') {
      inputRef.current?.focus();
    }
  }, [showCheckAlert]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setkeyboardHeight(event.endCoordinates.height);
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
        setkeyboardHeight(event.endCoordinates.height);
        console.log(keyboardHeight);
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
  }, [isVoiceMode]);

  const handleSetInputText = (text: string) => {
    setInputText(text);
  };
  const handlePress = () => {
    if (messages.length < allMessages.length) {
      if (messages[messages.length - 1].speaker === 'Nurse' && messages[messages.length - 1].second_step) {

        if (inputText.trim().length === 0) {
          inputRef.current?.focus();
          return;
        } else {
          console.log(inputText);
          setShowCheckAlert(true);
        }
      } else {
        setMessages(allMessages.slice(0, messages.length + 1));
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
      }
    } else {
      setShowNextAlert(true);
    }
  };
  const setIsSpeakingByIndex = (index: number, bool: boolean) => {
    const speakingList: boolean[] = [...isSpeaking];
    speakingList[index] = bool;
    setIsSpeaking(speakingList);
  };

  const handleSend = () => {
    handlePress();
    flatListRef.current?.scrollToEnd({ animated: true });
  };
  const handleNext = () => {
    navigation.popToTop();
  };
  const handleCancle = () => {
    setShowNextAlert(false);
  };
  const handleCheckNext = () => {
    setInputText('');
    setShowCheckAlert(false);
    setMessages(allMessages.slice(0, messages.length + 1));
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };
  const handleCheckCancle = () => {
    setShowCheckAlert(false);
  };

  const hasInputText = messages.some(
    (item) => item.speaker === 'Nurse' && item.second_step
  );
  const [buttonTranslateY] = useState(new Animated.Value(100));


  useEffect(() => {
    Animated.timing(buttonTranslateY, {
      toValue: hasInputText ? 0 : 100,
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
                isSpeaking={isSpeaking[index]}
                speakingList={isSpeaking}
                onIsClickSpeakChange={(isSpeaking) => setIsSpeakingByIndex(index, isSpeaking)}
              />
            ) : (
              <ChatBubble
                item={item}
                isBookmarked={false}
                isSpeaking={isSpeaking[index]}
                speakingList={isSpeaking}
                onIsClickSpeakChange={(isSpeaking) => setIsSpeakingByIndex(index, isSpeaking)}
              />
            )}
          </TouchableOpacity>
        )}
      />
      <Animated.View style={{ transform: [{ translateY: buttonTranslateY }] }}>
        <VoiceRecordButton
          setInputText={setInputText}
          setIsVoiceMode={setIsVoiceMode}
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


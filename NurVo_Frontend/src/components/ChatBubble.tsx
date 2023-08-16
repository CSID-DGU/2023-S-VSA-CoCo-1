import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Body011, Body012, Body023 } from "../utilities/Fonts";
import { layoutStyles, screenWidth } from "../utilities/Layout";
import Colors from "../utilities/Color";
import { speech } from "../utilities/TextToSpeech";
import { addSentenceBookmark, deleteSentenceBookmark } from "../utilities/ServerFunc";
import { TEST_USERID } from "@env";

export interface Message {
    id: number;
    speaker: string;
    dialogue: string;
    second_step?: string; 
    korean: string;
}

interface ChatBubbleProps {
  index: number;
  item: Message;
  isBookmarked: boolean;
  inputRef?: React.RefObject<TextInput>;
  input?: string;
  inputValues?: { [key: number]: string };
  isVoiceMode?: boolean;
  isLastItem?: boolean;
  isSpeaking?: boolean;
  speakingList: boolean[];
  onEnterValue?: () => void;
  onChagneText?: (text: string) => void;
  onIsClickSpeakChange?: (isSpeaking: boolean) => void;
}

const userId = TEST_USERID;
const icon_speak = "volume-high";
const icon_translation = "language";
const icon_bookmark = "bookmark";

export default function ChatBubble({ index, item, isBookmarked, isSpeaking, speakingList, onIsClickSpeakChange }: ChatBubbleProps) {
  useEffect(() => {
    setIsBookmark(isBookmarked);
  }, [isBookmarked]);

  const [isBookmark, setIsBookmark] = useState(false);
  const [isShowTranslation, setIsShowTranslation] = useState(false);

  const handleBookmark = async () => {
    if (isBookmark) {
      await deleteSentenceBookmark(item.id, userId);
    } else {
      const response = await addSentenceBookmark(item.id, userId);
    }
    setIsBookmark(!isBookmark);
  }
  const handleBook = () => {
    setIsShowTranslation(!isShowTranslation);
  }
  const handleSpeak = () => {
    if (!(speakingList.some(value => value)) && onIsClickSpeakChange) {
      onIsClickSpeakChange(true);
      speech(item.dialogue, item.id, item.speaker.trim().toLowerCase() === 'nurse', () => { onIsClickSpeakChange(false) });
    }
  }
  return (
    <View key={index} style={[
      item.speaker.trim().toLowerCase() === 'nurse' ? bubbleStyles.messageContainerRight : bubbleStyles.messageContainerLeft
    ]}>
      <View style={[
        bubbleStyles.bubble,
        item.speaker.trim().toLowerCase() === 'nurse' ? bubbleStyles.bubbleRight : bubbleStyles.bubbleLeft
      ]}>
        <Body012 text={item.dialogue} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} />
        {isShowTranslation && <Body023 text={item.korean} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.GRAY09 : Colors.GRAY03} style={bubbleStyles.translation}/>}
        <View style={[
          layoutStyles.HStackContainer,
          {
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignSelf: item.speaker.trim().toLowerCase() === 'nurse' ? 'flex-start' : 'flex-end',
            marginTop: 16,
          }
        ]}>
          {item.speaker.trim().toLowerCase() === 'nurse' && <TouchableOpacity onPress={handleBookmark}>
            <Ionicons name={isBookmark ? icon_bookmark : `${icon_bookmark}-outline`} size={20} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} />
          </TouchableOpacity>}
          <TouchableOpacity onPress={handleBook}>
            <Ionicons name={isShowTranslation ? icon_translation : `${icon_translation}-outline`} size={20} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} style={{ marginHorizontal: 16 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSpeak}>
            <Ionicons name={isSpeaking ?  icon_speak : `${icon_speak}-outline`} size={20} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function ChatBubbleInputWord({ index, item, isBookmarked, onEnterValue, onChagneText, inputRef, input, inputValues, isVoiceMode, isLastItem, isSpeaking, speakingList, onIsClickSpeakChange,  }: ChatBubbleProps) {
  useEffect(() => {
    setIsBookmark(isBookmarked);
  }, [isBookmarked]);

  const [isBookmark, setIsBookmark] = useState(false);
  const [isShowTranslation, setIsShowTranslation] = useState(false);

  const handleBookmark = async() => { 
    if (isBookmark) {
      await deleteSentenceBookmark(item.id, userId);
    } else {
      const response = await addSentenceBookmark(item.id, userId);
    }
    setIsBookmark(!isBookmark) 
  }
  const handleBook = () => { setIsShowTranslation(!isShowTranslation) }
  const handleSpeak = () => {
    if (!(speakingList.some(value => value)) && onIsClickSpeakChange) {
      onIsClickSpeakChange(true);
      speech(item.dialogue, item.id, item.speaker.trim().toLowerCase() === 'nurse', () => { onIsClickSpeakChange(false) });
    }
  }

  const textWithInputs = replaceWithInput(item.dialogue, item.second_step);

  return (
    <View key={index} style={[
      item.speaker.trim().toLowerCase() === 'nurse' ? bubbleStyles.messageContainerRight : bubbleStyles.messageContainerLeft
    ]}>
      <View style={[
        bubbleStyles.bubble,
        inputBubbleStyles.container,
        item.speaker.trim().toLowerCase() === 'nurse' ? bubbleStyles.bubbleRight : bubbleStyles.bubbleLeft,
        { flexDirection: 'row', flexWrap: 'wrap' }
      ]}>
        <View style={[layoutStyles.VStackContainer]}>
          {textWithInputs.map((segment, index) => {
            if (typeof segment === 'string') {
              return (
                <Body012
                  key={index}
                  text={segment}
                  color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK}
                />
              );
            } else {
              return isLastItem ? (
                <TextInput
                  key={index}
                  style={[
                    inputBubbleStyles.input,
                    { color: Colors.BLACK, marginVertical: 4 },
                  ]}
                  value={input}
                  ref={inputRef}
                  onSubmitEditing={onEnterValue}
                  onChangeText={onChagneText}
                  showSoftInputOnFocus={!isVoiceMode}
                />
              ) : (
                inputValues && checkInputWord(index, inputValues[item.id], item.second_step)
              )
            }
          })}
        </View>
        {isShowTranslation && <Body023 text={item.korean} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.GRAY09 : Colors.GRAY03} style={bubbleStyles.translation}/>}
        <View style={[
          layoutStyles.HStackContainer,
          {
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: item.speaker.trim().toLowerCase() === 'nurse' ? 'flex-start' : 'flex-end',
            marginTop: 16,
          }
        ]}>
          {item.speaker.trim().toLowerCase() === 'nurse' && <TouchableOpacity onPress={handleBookmark}>
            <Ionicons name={isBookmark ? icon_bookmark : `${icon_bookmark}-outline`} size={20} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} />
          </TouchableOpacity>}
          <TouchableOpacity onPress={handleBook}>
            <Ionicons name={isShowTranslation ? icon_translation : `${icon_translation}-outline`} size={20} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} style={{ marginHorizontal: 16 }} />
          </TouchableOpacity>
          {!(isLastItem && item.speaker.trim().toLowerCase() === 'nurse') && <TouchableOpacity onPress={handleSpeak}>
            <Ionicons name={isSpeaking ? icon_speak : `${icon_speak}-outline`} size={20} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} />
          </TouchableOpacity>}
        </View>
      </View>
    </View>
  );
}

export function ChatBubbleInputAll({ index, item, isBookmarked, onEnterValue, onChagneText, inputRef, input, inputValues, isVoiceMode, isLastItem, isSpeaking, speakingList, onIsClickSpeakChange }: ChatBubbleProps) {
  useEffect(() => {
    setIsBookmark(isBookmarked);
  }, [isBookmarked]);

  const [isBookmark, setIsBookmark] = useState(false);
  const [isShowTranslation, setIsShowTranslation] = useState(false);

  const handleBookmark = async () => {
    if (isBookmark) {
      await deleteSentenceBookmark(item.id, userId);
    } else {
      const response = await addSentenceBookmark(item.id, userId);
    }
    setIsBookmark(!isBookmark);
  }
  const handleBook = () => {
    setIsShowTranslation(!isShowTranslation);
  }
  const handleSpeak = () => {
    if (!(speakingList.some(value => value)) && onIsClickSpeakChange) {
      onIsClickSpeakChange(true);
      speech(item.second_step ? item.second_step : item.dialogue, item.id, item.speaker.trim().toLowerCase() === 'nurse', () => { onIsClickSpeakChange(false) });
    }
  }

  return (
    <View key={item.id} style={[
      item.speaker.trim().toLowerCase() === 'nurse' ? bubbleStyles.messageContainerRight : bubbleStyles.messageContainerLeft
    ]}>
      <View style={[
        bubbleStyles.bubble,
        inputBubbleStyles.container,
        item.speaker.trim().toLowerCase() === 'nurse' ? bubbleStyles.bubbleRight : bubbleStyles.bubbleLeft,
        { flexDirection: 'row', flexWrap: 'wrap' }
      ]}>
        <View style={[layoutStyles.VStackContainer, { width: '100%' }]}>
          {item.speaker.trim().toLowerCase() === 'nurse' ?
            (isLastItem ?
              <TextInput
                style={[inputBubbleStyles.input, { color: Colors.BLACK, marginVertical: 4 }]}
                ref={inputRef}
                value={input}
                onSubmitEditing={onEnterValue}
                onChangeText={(text) => { if (onChagneText) { onChagneText(text); } }}
                showSoftInputOnFocus={!isVoiceMode}
                multiline={true}
              /> :
              inputValues && checkInputWord(index, inputValues[item.id], item.second_step)
            ) :
            (<Body012 key={index} text={item.dialogue} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} />)}
          {isShowTranslation && <Body023 text={item.korean} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.GRAY09 : Colors.GRAY03} style={bubbleStyles.translation}/>}
          <View style={[
            layoutStyles.HStackContainer,
            {
              flexWrap: 'wrap',
              justifyContent: item.speaker.trim().toLowerCase() === 'nurse' ? 'flex-start' : 'flex-end',
              marginTop: 16,
            }
          ]}>
            {item.speaker.trim().toLowerCase() === 'nurse' && <TouchableOpacity onPress={handleBookmark}>
              <Ionicons name={isBookmark ? icon_bookmark : `${icon_bookmark}-outline`} size={20} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} />
            </TouchableOpacity>}
            <TouchableOpacity onPress={handleBook}>
              <Ionicons name={isShowTranslation ? icon_translation : `${icon_translation}-outline`} size={20} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} style={{ marginHorizontal: 16 }} />
            </TouchableOpacity>
            {!(isLastItem && item.speaker.trim().toLowerCase() === 'nurse') && <TouchableOpacity onPress={handleSpeak}>
              <Ionicons name={isSpeaking ? icon_speak : `${icon_speak}-outline`} size={20} color={item.speaker.trim().toLowerCase() === 'nurse' ? Colors.WHITE : Colors.BLACK} />
            </TouchableOpacity>}
          </View>
        </View>
      </View>
    </View>
  );
}

function replaceWithInput(text: string, textToReplace?: string) {
  if (textToReplace === '' || textToReplace === undefined) {
    return [text];
  } else {
    const segments = text.split(new RegExp(`(${textToReplace})`, 'gi'));
    const result = segments.map((segment, index) => {
      if (segment.toLowerCase() === textToReplace.toLowerCase()) {
        return;
      } else {
        return segment;
      }
    });
    return result;
  }
}

function checkInputWord(index: number, inputValue: string, second_step?: string) {
  const jsonValue = JSON.parse(inputValue);
  return (
    <View key={index} style={[layoutStyles.VStackContainer, { paddingVertical: 10 }]}>
      <Body012 text={jsonValue.text} color={Colors.GRAY07} />
      <Body011 text={`${second_step}`} color={jsonValue.isOver ? Colors.NAVY : Colors.YELLOW} />
    </View>
  )
}

const bubbleStyles = StyleSheet.create({

  messageContainerRight: {
    alignSelf: 'flex-end',
  },
  messageContainerLeft: {
    alignSelf: 'flex-start',
  },
  bubble: {
    marginVertical: 14,
    padding: 12,
    borderRadius: 20,

    width: screenWidth - 20 * 2 - 50, //20 is paddingHorizontal

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(234, 234, 234, 0.80)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.MAINGREEN,
    borderTopRightRadius: 0,
  },
  bubbleLeft: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 0,
  },
  translation: {
    marginTop: 8,
  }
});

const inputBubbleStyles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  input: {
    flex: 1,
    flexWrap: 'wrap',
    borderWidth: 1.5,
    borderColor: Colors.GRAY09,
    backgroundColor: Colors.GRAY09,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 4,
    fontFamily: 'Pretendard Variable',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
  },
  inputAll: {

  },
})
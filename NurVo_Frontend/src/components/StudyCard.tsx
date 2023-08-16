import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../utilities/Color';
import { Title01, Title02 } from '../utilities/Fonts';
import { speech, stopSpeech } from "../utilities/TextToSpeech";
import { screenHeight } from '../utilities/Layout';

interface StudyCardProps {
  id: number;
  item: {
    conversation_id: number;
    dialogue: string;
    chapter: string;
    date: string;
    korean: string;
  }[];
  style?: number;
  isAction?: string;
}

// React.forwardRef로 감싼 StudyCard 컴포넌트를 정의합니다.
const StudyCard = ({ id, item, style, isAction }: StudyCardProps) => {
  const [cardTurn, setCardTurn] = useState(false); // 카드 뒤집기
  const [isSpeaking, setIsSpeaking] = useState(false); // tts 동작

  const turnCard = () => {
    setCardTurn(prev => !prev);
  }

  const handleSpeak = async () => {
    if (!isSpeaking) {
      setIsSpeaking(true);
      speech(item.dialogue, id, item.conversation_id, true, async () => {
        await stopSpeech(); // Assuming stopSpeech is an async function
        await setIsSpeaking(false);
      });
    }
  }

  useEffect(()=>{
    if (isAction === 'remove' || isAction === 'keep'){
      stopSpeech(); // Assuming stopSpeech is an async function
      setIsSpeaking(false);
    }
  },[isAction]);

  return (
    <TouchableOpacity onPress={turnCard} style={styles.container}>


      {!cardTurn ? (
        <View style={[styles.textCard, style, cardTurn ? styles.turnTextCard : null]}>
          <Title02 text={item.dialogue} color={Colors.BLACK} style={{ marginHorizontal: 25 }} />
          <TouchableOpacity onPress={handleSpeak} style={styles.speaker}>
            <Ionicons
              name={isSpeaking ? 'volume-high' : 'volume-high-outline'}
              size={30}
              color={Colors.GRAY03}
            />
          </TouchableOpacity>
        </View>

      ) : (

        <View style={[styles.textCard, style, cardTurn ? styles.turnTextCard : null]}>
          <Title02 text={item.korean} color={Colors.BLACK} style={{ marginHorizontal: 25 }} />

          <TouchableOpacity onPress={handleSpeak} style={[styles.speaker, { top: 16, left: 18 }]}>
            <Ionicons
              name={isSpeaking ? 'volume-high' : 'volume-high-outline'}
              size={30}
              color={Colors.GRAY03}
            />
          </TouchableOpacity>
        </View>
      )}

    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
    marginTop: 50,
    borderRadius: 15,
  },
  textCard: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: Colors.MAINLIGHTGREEN,
    borderRadius: 15,
  },
  turnTextCard: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.MAINGREEN,
  },
  speaker: {
    position: 'absolute',
    top: 18,
    left: 20,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default StudyCard;
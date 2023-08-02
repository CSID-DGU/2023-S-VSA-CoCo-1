import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import color from '../utilities/Color';

interface StudyCardProps {
  context1: string;
  context2: string;
  style: number
}

// React.forwardRef로 감싼 StudyCard 컴포넌트를 정의합니다.
const StudyCard: React.FC<StudyCardProps> = ({ context1, context2, style }) => {
  // 카드 뒤집기
  const [cardTurn, setCardTurn] = useState(false);

  const turnCard = () => {
    setCardTurn(prev => !prev);
  }

  return (
    <TouchableOpacity onPress={turnCard}>
      <View
        style={[styles.textCard, style, cardTurn ? styles.turnTextCard : null]}>
        {!cardTurn ? (
          <Text style={[styles.cardText, styles.cardText_en, color.BLACK]}>{context1}</Text>
        ) : (
          <Text style={[styles.cardText, styles.cardText_ko, color.BLACK]}>{context2}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textCard: {
    marginHorizontal: 10,
    marginVerticala: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 196, 150, 0.5)',
    borderRadius: 15,
  },
  turnTextCard: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 2,
    borderColor: 'rgba(98, 196, 150, 1)',
  },
  cardText: {
    marginHorizontal: 40,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cardText_en: {
    fontFamily: 'Pretendard Variable',
  },
  cardText_ko: {
    fontFamily: '함초롱바탕',
  },
});

export default StudyCard;
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface StudyCardProps {
  context1: string;
  context2: string;
}

// React.forwardRef로 감싼 StudyCard 컴포넌트를 정의합니다.
const StudyCard: React.FC<StudyCardProps> = ({ context1, context2 }) => {
  // 카드 뒤집기
  const [cardTurn, setCardTurn] = useState(false);

  const turnCard = () => {
    setCardTurn(prev => !prev);
  }

  return (
    <TouchableOpacity onPress={turnCard}>
      <View style={[styles.textCard, cardTurn ? styles.turnTextCard : null]}>
        {!cardTurn ? (
          <Text style={styles.cardText}>{context1}</Text>
        ) : (
          <Text style={styles.cardText}>{context2}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textCard: {
    marginHorizontal: 5,
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
    marginHorizontal: 10,
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 20,
    textAlign: 'left',
  },
});

export default StudyCard;
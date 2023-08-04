import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../utilities/Color';
import { Title01_1 } from '../utilities/Fonts';

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
    <View style={styles.container}>
      <TouchableOpacity onPress={turnCard}>
        <View
          style={[styles.textCard, style, cardTurn ? styles.turnTextCard : null]}>
          {!cardTurn ? (
            <Title01_1 text={context1} color={Colors.BLACK} />
          ) : (
            <Title01_1 text={context2} color={Colors.BLACK} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textCard: {
    marginHorizontal: 10,
    marginVerticala: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.MAINLIGHTGREEN,
    borderRadius: 15,
  },
  turnTextCard: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.MAINGREEN,
  },
});

export default StudyCard;
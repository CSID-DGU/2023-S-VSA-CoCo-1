import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ListCell } from '../components/ListCellComp';
import { SelectStepProp } from '../utilities/NavigationTypes';
import Colors from '../utilities/Color';
import { layoutStyles, screenHeight, screenWidth } from '../utilities/Layout';
import { Body011, Body012, Body022, Subtext011, Subtitle011 } from '../utilities/Fonts';

export default function SelectStepScreen({ navigation, route }: SelectStepProp) {
  const item = route.params.chapter;
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const handlePress = (step: number) => {
    setSelectedStep(step);
  };
  const handleConfirm = () => {
    if (selectedStep !== null) {
      switch (selectedStep) {
        case 1:
          navigation.navigate("LessonFirstScreen", { chapterId: item.id, chapter_name: item.name, step: 1 });
          return;
        case 2:
          navigation.navigate("LessonSecondScreen", { chapterId: item.id, chapter_name: item.name, step: 2 });
          return;
        case 3:
          navigation.navigate('LessonThirdScreen', { chapterId: item.id, chapter_name: item.name, step: 3 });
          return;
        default:
          return;
      }
    }
  };
  return (
    <View style={styles.container}>
      <ListCell item={item} style={{ backgroundColor: Colors.WHITE }} />

      <View style={styles.contentContainer}>
        <Body012 text={`학습을 완료한 챕터입니다.\n\n학습할 단계를 선택해주세요.`} color={Colors.BLACK} style={{ textAlign: 'center' }} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, selectedStep === 1 ? styles.selectedButton : null]} onPress={() => handlePress(1)}>
            <Body012 text='step 1' color={Colors.GRAY03} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, selectedStep === 2 ? styles.selectedButton : null]} onPress={() => handlePress(2)}>
            <Body012 text='step 2' color={Colors.GRAY03} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, selectedStep === 3 ? styles.selectedButton : null]} onPress={() => handlePress(3)}>
            <Body012 text='step 3' color={Colors.GRAY03} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={layoutStyles.HStackContainer}>
        <TouchableOpacity style={selectedStep === null ? styles.confirmButton : styles.selectedConfirmButton } onPress={handleConfirm}>
          <Body011 text='학습하기' color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    shadowColor: Colors.GRAY09,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  contentContainer: {
    borderRadius: 12,
    backgroundColor: Colors.WHITE,

    shadowColor: Colors.GRAY09,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,

    marginVertical: 24,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 50,
    justyfyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    backgroundColor: Colors.WHITE,
    borderRadius: 32,
    width: (screenWidth - 120) / 3,
    height: (screenWidth - 120) / 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.GRAY03,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: Colors.GRAY08,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: Colors.GRAY09,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  selectedConfirmButton: {
    flex: 1,
    backgroundColor: Colors.MAINGREEN,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: Colors.GRAY09,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  selectedButton: {
    borderColor: Colors.MAINGREEN,
    borderWidth: 3,
  },
});
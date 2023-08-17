import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Colors from '../utilities/Color';
import { Body012, Subtext011, Subtext012 } from '../utilities/Fonts';

interface SignUpCellrProps {
  title: string;
  initialText: string;
  subText?: string;
  isConfirmButton?: boolean;
  buttonText?: string;
  isButtonDisable?: boolean;

  onText: (value: string) => void;
  onClickAction: (value: string) => void;
}

const SignUpCell = ({ title, initialText, subText, isConfirmButton, buttonText, isButtonDisable, onText, onClickAction }: SignUpCellrProps) => {
  const isConfirm = isConfirmButton ? isConfirmButton : false;
  const isSubText = subText ? true : false;
  const [text, onChangeText] = useState('');

  useEffect(() => {
    onText(text);
  }, [text]);

  const onClick = () => {
    onClickAction(buttonText);
  }

  return (
    <View style={styles.container}>
      <Body012 text={title} color={Colors.GRAY03} />

      {isConfirm ? (
        <View style={styles.confirmContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeText}
              placeholder={`${initialText}`}
              placeholderTextColor={Colors.GRAY07}
              secureTextEntry={title.includes('비밀번호') ? true : false}
              autoFocus
            />
          </View>
          <TouchableOpacity style={[styles.buttonContainer, isButtonDisable ? {borderColor: Colors.GRAY05} : null]} onPress={onClick} disabled={isButtonDisable}>
            <Subtext011 text={buttonText} color={isButtonDisable ? Colors.GRAY05 : Colors.MAINGREEN} style={{ marginVertical: 0, marginHorizontal: 7 }} />
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholder={`${initialText}`}
          placeholderTextColor={Colors.GRAY07}
          secureTextEntry={title.includes('비밀번호') ? true : false}
          keyboardType={title.includes('휴대전화 번호') ? "numeric" : "default"}
          autoFocus
        />
      )}

      {isSubText && <Subtext012 text={`* ${subText}`} color={Colors.GRAY05} />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  confirmContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    paddingHorizontal: 0,
    paddingVertical: 5,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY07,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.MAINGREEN,
    borderRadius: 15,
  },
});

export default SignUpCell;
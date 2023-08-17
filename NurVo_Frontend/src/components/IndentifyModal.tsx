import { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, FlatList, TextInput } from "react-native";
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from "../utilities/Color";
import { screenWidth } from '../utilities/Layout';
import { Body011, Body021, Subtext012 } from '../utilities/Fonts';

interface IndentifyModalProps {
  isAction: boolean;
  isIndenify: boolean;

  onText: (value: string) => Void;
  onClose: (value: boolean) => Void;
  onConfirmText: (value: string) => Void;
}

const IndentifyModal = ({ isAction, isIndenify, onText, onClose, onConfirmText }: IndentifyModalProps) => {
  const isOpen = isAction;
  const [text, onChangeText] = useState('');

  useEffect(() => {
    onText(text);
  }, [text]);

  const onCloseClick = () => {
    onClose(false);
  }

  const onConfirm = () => {
    onConfirmText('인증번호 확인');
  }

  return (
    <>
      <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={isOpen}
        backdropColor='gray'
      >
        <View style={styles.container}>

          <Body011 text='인증번호 확인' color={Colors.WHITE} style={styles.textContainer} />
          <Ionicons
            name="close"
            size={23.5}
            color={Colors.WHITE}
            style={styles.ioniconsContainer}
            onPress={onCloseClick}
          ></Ionicons>

          <View style={styles.confirmContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                placeholder='인증번호'
                placeholderTextColor={Colors.GRAY07}
                autoFocus
              />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={onConfirm} >
              <Body021 text='인증번호' color={Colors.MAINGREEN} style={{ marginHorizontal: 20 }} />
              <Body021 text='확인' color={Colors.MAINGREEN} />
            </TouchableOpacity>
          </View>

          {isIndenify && <Subtext012 text='* 인증 번호가 일치하지 않습니다' color='red' />}

        </View>

      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: screenWidth * 0.1,
    borderWidth: 2,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.MAINGREEN,
    borderRadius: 20,
  },
  confirmContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    paddingHorizontal: 0,
    paddingVertical: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY07,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: Colors.MAINGREEN,
    borderRadius: 25,
  },
  textContainer: {
    paddingVertical: 10,
    backgroundColor: Colors.MAINGREEN,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
  },
  ioniconsContainer: {
    position: 'absolute',
    top: 8,
    right: 10,
  }
});

export default IndentifyModal;
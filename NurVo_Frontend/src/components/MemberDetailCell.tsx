import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../utilities/Color';
import { Body012, Subtext012 } from '../utilities/Fonts';

import open from '../assets/images/open.png';

interface MemberDetailCellProps {
  title: string,
  infor: string,

  openPage?: string
  isOpenPage?: boolean,
}

const MemberDetailCell = ({ title, infor, openPage, isOpenPage }: MemberDetailCellProps) => {
  const navigation = useNavigation();
  const isOpenPagesButton = isOpenPage || false;

  const openPages = () => {
    navigation.navigate(openPage);
  };

  return (

    <View style={styles.container}>
      <Subtext012 text={title} color={Colors.GRAY05} style={{ paddingBottom: 5 }} />
      <Body012 text={infor} color={Colors.GRAY03} style={{ paddingBottom: 10 }} />

      {isOpenPagesButton ?
        <TouchableOpacity style={styles.openButton} onPress={openPages}>
          <Image source={open} />
        </TouchableOpacity>
        : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY09,
  },
  openButton: {
    position: 'absolute',
    top: '25%',
    right: 0,
  }
});

export default MemberDetailCell;
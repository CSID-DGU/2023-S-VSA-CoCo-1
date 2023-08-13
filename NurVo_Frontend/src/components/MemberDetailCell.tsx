import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../utilities/Color';
import { Body012, Subtext012 } from '../utilities/Fonts';

import open from '../assets/images/open.png';

interface MemberDetailCellProps {
  title: string,
  infor: string,

  openPage?: string
  isOpenIcon?: boolean,
}

const MemberDetailCell = ({ title, infor, isOpenIcon }: MemberDetailCellProps) => {
  const isOpenPagesButton = isOpenIcon || false;

  return (
    <View style={styles.container} >
      <Subtext012 text={title} color={Colors.GRAY05} style={{ paddingBottom: 5 }} />
      <Body012 text={infor} color={Colors.GRAY03} style={{ paddingBottom: 10 }} />

      {isOpenPagesButton ? (
        <Ionicons name='chevron-forward-outline' size={14} color={Colors.GRAY05} style={styles.openButton} />
      ) : null
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
    marginTop: 15,
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
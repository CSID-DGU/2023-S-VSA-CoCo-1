import React, { useRef, useEffect, useState } from 'react';
import { View, ViewStyle, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../utilities/Color';

interface ProgressBarProps {
  length: number;
  progress: number;
}

const ProgressBar = ({ length, progress }: ProgressBarProps) => {

  const progressStyle: ViewStyle = {
    width: `${(progress / length) * 100}%`,
    paddingVertical: 10,
    backgroundColor: Colors.MAINGREEN,
  };

  return (
    <View style={styles.progressBar}>
      <View style={progressStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    marginVertical: 0,
    marginHorizontal: 0,
    backgroundColor: Colors.MAINLIGHTGREEN,
  },
})

export default ProgressBar;
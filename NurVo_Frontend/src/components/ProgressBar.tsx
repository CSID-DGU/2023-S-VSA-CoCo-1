import React, { useRef, useEffect, useState } from 'react';
import { View, ViewStyle, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ProgressBarProps {
  length: number;
  progress: number;
}

const ProgressBar = ({ length, progress }: ProgressBarProps) => {

  const progressStyle: ViewStyle = {
    width: `${(progress / length) * 100}%`,
    paddingVertical: 10,
    backgroundColor: 'rgba(98, 196, 150, 1)',
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
    backgroundColor: 'rgba(98, 196, 150, 0.2)',
  },
})

export default ProgressBar;
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-animatable';
import { screenWidth } from '../utilities/Layout';

export default function LaunchFirstScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo_icon_nobg.png')} style={styles.image} resizeMode='contain'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: (screenWidth/3)*2
  },
});

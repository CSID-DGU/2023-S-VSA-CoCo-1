import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-animatable';
import { screenWidth } from '../utilities/Layout';
import { HomeStackNavigationProp } from '../utilities/NavigationTypes';
import { useNavigation } from '@react-navigation/core';

export default function LaunchFirstScreen() {
  const navigation = useNavigation<HomeStackNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainPage');
    }, 500);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo_icon_nobg.png')} style={styles.image} resizeMode='contain' />
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
    width: 150
  },
});

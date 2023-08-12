import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Text, Animated } from 'react-native';
import { Slider } from '@react-native-assets/slider'

import Colors from '../utilities/Color';

import img1 from '../assets/images/로고.png';

interface SliderProps {
  initalValue: number,
  minValue: number,
  maxValue: number,
  step: number,
  styles?: {},

  numberOfChapter: (value: number) => Void,
}

const Sliders = ({ initalValue, minValue, maxValue, step, styles, numberOfChapter }: SliderProps) => {

  const changeNumber = (value: number) => {
    numberOfChapter(value);
  }

  return (
    <View style={styles}>
      <Slider
        value={initalValue}                         // set the current slider's value
        minimumValue={minValue}                  // Minimum value
        maximumValue={maxValue}                  // Maximum value
        step={step}                          // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
        minimumTrackTintColor={Colors.MAINGREEN}      // The track color before the current value
        maximumTrackTintColor={Colors.MAINLIGHTGREEN}      // The track color after the current value
        thumbStyle={{ width: 40, height: 40, backgroundColor: null }}            // Override the thumb's style
        enabled={true}                    // If false, the slider won't respond to touches anymore
        trackHeight={20}                   // The track's height in pixel
        thumbSize={30}                    // The thumb's size in pixel
        thumbImage={img1}            // An image that would represent the thumb
        slideOnTap={true}                 // If true, touching the slider will update it's value. No need to slide the thumb.
        onValueChange={changeNumber}         // Called each time the value changed. The type is (value: number) => void
      />
    </View>
  );
};

export default Sliders;
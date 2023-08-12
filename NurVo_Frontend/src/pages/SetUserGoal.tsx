import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import Colors from '../utilities/Color';
import { Body011, Title01 } from '../utilities/Fonts';
import { screenHeight } from '../utilities/Layout';
import Sliders from '../components/Sliders';

const Year = ['2023', '2024', '2025', '2026', '2027'];
const Month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const Day = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13',
  '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

const App = ({ navigation }) => {
  const [number, setNumber] = useState(1);
  const [date, setDate] = useState(['0000', '00', '00']);
  const [editingIndex, setEditingIndex] = useState(null);

  const dataSave = () => {
    navigation.navigate('MemberDetails', { data: number });
  }

  const changeNumber = (value: number) => {
    setNumber(value);
  }

  const openKeybord = (index: number) => {
    setEditingIndex(index);
  };

  const innerArray = (index: number, value: string) => {
    if (index === 0) {
      return Year.find((item) => value === item);
    } else if (index === 1) {
      return Month.find((item) => value === item);
    } else {
      return Day.find((item) => value === item);
    }
  }

  const inputDate = (index: number, value: string) => {
    const newDate = [...date];
    newDate[index] = value;
    setDate(newDate);
  };

  const handleDateChange = (index: number, newValue: string) => {
    if (newValue.length === (index === 0 ? 4 : 2)) {
      const result = innerArray(index, newValue);
      if (result) {
        inputDate(index, newValue);
      } else {
        const initai = index === 0 ? '0000' : '00';
        inputDate(index, initai);
      }
      setEditingIndex(null);
    } else {
      inputDate(index, newValue);
    }
  };

  return (
    <View style={containerStyles.container}>
      <Title01 text="Let's create your goals!" color={Colors.BLACK} />

      <View style={containerStyles.sliderContainer}>
        <View style={containerStyles.sliderTextContainer}>
          <Body011 text={number} color={Colors.BLACK} style={textStyles.sliderText1} />
          <Body011 text='  chapter' color={Colors.BLACK} style={textStyles.sliderText2} />
        </View>
        <Body011 text='to study for a week' color={Colors.BLACK} style={textStyles.sliderText3} />
        <Sliders
          initalValue={1}
          minValue={1}
          maxValue={7}
          step={1}
          styles={{ marginHorizontal: 10, }}
          numberOfChapter={changeNumber} />
      </View>

      <View style={containerStyles.dateContainer}>
        <Body011 text='Target Date' color={Colors.BLACK} style={textStyles.sliderText3} />

        <View>
          {editingIndex !== null && (
            <TextInput
              style={{ position: 'absolute' }}
              maxLength={editingIndex === 0 ? 4 : 2}
              onChangeText={(newValue) => handleDateChange(editingIndex, newValue)}
              autoFocus
              secureTextEntry
              caretHidden
            />
          )}

          <View style={containerStyles.dateTextContainer}>
            <TouchableOpacity onPress={() => openKeybord(0)}>
              <Body011 text={`${date[0]}. `} color={Colors.GRAY03} style={textStyles.dateText1} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openKeybord(1)}>
              <Body011 text={`${date[1]}. `} color={Colors.GRAY03} style={textStyles.dateText1} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openKeybord(2)}>
              <Body011 text={`${date[2]}.`} color={Colors.GRAY03} style={textStyles.dateText1} />
            </TouchableOpacity>
          </View>
          
        </View>
      </View>

      <View style={containerStyles.buttonContainer}>
        <TouchableOpacity style={buttonStyles.button} onPress={dataSave}>
          <Body011 text='save' color={Colors.BLACK} style={{ fontSize: 20, }} />
        </TouchableOpacity>
      </View>
    </View >
  );
};

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY09,
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 20,
  },
  sliderTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  dateTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: screenHeight * 0.06,
    backgroundColor: Colors.GRAY07,
    borderRadius: 15,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});

const textStyles = StyleSheet.create({
  sliderText1: {
    fontSize: 35,
    lineHeight: 35,
  },
  sliderText2: {
    fontSize: 25,
    lineHeight: 35,
  },
  sliderText3: {
    marginBottom: 10,
    fontSize: 25,
  },
  dateText1: {
    fontSize: 35,
    lineHeight: 42,
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 35,
    backgroundColor: Colors.GRAY09,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default App;
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import Colors from '../utilities/Color';
import { Body011, Title01, Title02 } from '../utilities/Fonts';
import { screenHeight } from '../utilities/Layout';
import { updateUserInfo } from '../utilities/ServerFunc';
import Sliders from '../components/Sliders';
import DateTimePickerModalProps from '../components/DateTimePickerModalProps';
import CustomAlert from '../components/Alert';

const SetUserGoal = ({ navigation, route }: any) => {
  const goals = route.params.data;
  const prevScreen = route.params?.prevScreen || '';
  const [number, setNumber] = useState(goals.obj);
  const [date, setDate] = useState(goals.obj_date);
  const [isModalAction, setIsModalAction] = useState(false);
  const [isAlretAction, setIsAlretAction] = useState(false);
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    async function updateUser() {
      try {
        const stringNumber = "" + number;
        const ipdateUserInfo = await updateUserInfo({ obj: stringNumber, obj_date: date });
        if (prevScreen === 'Login') {
          navigation.navigate('HomeScreen', { data: ipdateUserInfo });
        } else {
          navigation.pop();
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    if (isSave) {
      updateUser();
      setIsSave(false);
    }
  }, [isSave]);

  const handleChangeNumber = (value: number) => {
    setNumber(value);
  }

  const handleChangeDate = (value: string) => {
    setDate(value);
  }

  const dataSave = () => {
    setIsSave(true);
  }

  const modalAction = () => {
    setIsModalAction(true);
  }

  const handleModalAction = (value: boolean) => {
    setIsModalAction(value);
  }

  const handleAlertAction = (value: boolean) => {
    setIsAlretAction(value);
  }

  const handleAlertClose = () => {
    setIsAlretAction(false);
  }


  return (
    <>
      <View style={containerStyles.container}>
        <Title01 text="Let's create your goals!" color={Colors.BLACK} />

        <View style={containerStyles.sliderContainer}>
          <View style={containerStyles.sliderTextContainer}>
            <Title02 text='Weekly Goal Chapters : ' color={Colors.BLACK} />
            <Title02 text={number} color={Colors.MAINGREEN} />
          </View>

          <Sliders
            initalValue={number}
            minValue={1}
            maxValue={50}
            step={1}
            styles={{ marginHorizontal: 10 }}
            numberOfChapter={handleChangeNumber} />
        </View>

        <View style={containerStyles.dateContainer}>
          <Title01 text='Target Date' color={Colors.BLACK} style={{ marginVertical: 10 }} />
          <TouchableOpacity style={containerStyles.dateTextContainer} onPress={modalAction} >
            <Title02 text={date} color={Colors.BLACK} />
          </TouchableOpacity>
          <DateTimePickerModalProps
            isAction={isModalAction}
            onDate={handleChangeDate}
            onDisable={handleModalAction}
            onAlertAction={handleAlertAction}
          />
        </View>

        <View style={containerStyles.buttonContainer}>
          <TouchableOpacity style={buttonStyles.button} onPress={dataSave}>
            <Body011 text='save' color={Colors.BLACK} style={{ fontSize: 20, }} />
          </TouchableOpacity>
        </View>

      </View>

      {isAlretAction &&
        <CustomAlert
          onConfirm={handleAlertClose}
          content='목표 일자를 재설정 해주세요'
          confirmText='확인' />
      }
    </>
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
    alignItems: 'center',
    marginVertical: 10,
  },
  dateTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: screenHeight * 0.06,
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.MAINGREEN,
    borderRadius: 15,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

export default SetUserGoal;


// {/*
// // const openKeybord = (index: number) => {
// //   setEditingIndex(index);
// // };

// // const innerArray = (index: number, value: string) => {
// //   if (index === 0) {
// //     return Year.find((item) => value === item);
// //   } else if (index === 1) {
// //     return Month.find((item) => value === item);
// //   } else {
// //     return Day.find((item) => value === item);
// //   }
// // }

// // const inputDate = (index: number, value: string) => {
// //   const newDate = [...date];
// //   newDate[index] = value;
// //   setDate(newDate);
// // };

// // const handleDateChange = (index: number, newValue: string) => {
// //   if (newValue.length === (index === 0 ? 4 : 2)) {
// //     const result = innerArray(index, newValue);
// //     if (result) {
// //       inputDate(index, newValue);
// //     } else {
// //       const initai = index === 0 ? '0000' : '00';
// //       inputDate(index, initai);
// //     }
// //     setEditingIndex(null);
// //   } else {
// //     inputDate(index, newValue);
// //   }
// // };
// <View>
//   {editingIndex !== null && (
//     <TextInput
//       style={{ position: 'absolute' }}
//       maxLength={editingIndex === 0 ? 4 : 2}
//       onChangeText={(newValue) => handleDateChange(editingIndex, newValue)}
//       autoFocus
//       secureTextEntry
//       caretHidden
//     />
//   )}


//   </View>
// </View> */}

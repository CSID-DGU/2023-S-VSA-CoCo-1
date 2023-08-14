import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, FlatList } from "react-native";
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import Colors from "../utilities/Color";
import { VStack } from '../utilities/Layout';
import information from '../assets/images/information.png';
import { Body011, Body012, Body017 } from '../utilities/Fonts';

interface ImformationAlertProps {
  image: {
    src: string,
    alt: string,
  }[];
}

const ImformationAlert = ({ image }: ImformationAlertProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const alertActionOpen = () => {
    setIsOpen(true);
  }

  const alertActionClose = () => {
    setIsOpen(false);
  }

  return (
    <View>
      <TouchableOpacity onPress={alertActionOpen}>
        <Image source={information} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={isOpen} 
        backdropColor='gray'>
        <View style={modalStyles.container}>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
            <Image source={information} style={{ marginHorizontal: 10, width: 25, height: 25 }} />
            <Text style={modalStyles.titleText}>INFORM</Text>
          </View>

          <Swiper
            autoplay={false} // 자동 스크롤 비활성화
            showsPagination={true}
            paginationStyle={{ marginBottom: 25 }}
            dotColor={Colors.GRAY05}
            dotStyle={{ width: 15, height: 10 }}
            activeDotColor={Colors.MAINGREEN}
            activeDotStyle={{ width: 15, height: 10 }}
            scrollEnabled={true}
            loop={false}
          >
            {image.map((item, index) => (
              <View key={index} style={{ flex: 1, justifyContent: 'center', marginBottom: 40, }}>
                <Image style={{ width: '100%', height: '100%' }} source={item.src} />
              </View>
            ))}
          </Swiper>

          <TouchableOpacity
            style={modalStyles.button}
            onPress={alertActionClose}>
            <Text style={modalStyles.buttonText}>Close</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  )
}

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 60,
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.MAINGREEN,
    borderRadius: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -2,
    width: '100%',
    height: 42,
    backgroundColor: Colors.MAINGREEN,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    fontFamily: 'Pretendard Variable',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 22,
    color: Colors.WHITE,
  },
  titleText: {
    fontFamily: 'Pretendard Variable',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '900',
    color: Colors.BLACK
  },
});

export default ImformationAlert;
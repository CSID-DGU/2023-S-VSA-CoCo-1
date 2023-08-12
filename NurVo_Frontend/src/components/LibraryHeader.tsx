import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ImformationAlert from './ImformationAlert';
import Colors from '../utilities/Color';

interface LibraryHeaderProps {
  title: string,
  image?: {
    src: string,
    alt: string,
  }[];
  isBack?: boolean,
  isDelete?: boolean,
}

const LibraryHeader = ({ title, image, isBack, isDelete }: LibraryHeaderProps) => {
  const navigation = useNavigation(); // 네비게이션 객체 받아오기
  const isback = isBack || false;
  const isdelete = isDelete || false;
  const [openItemBox, setOpenItemBox] = useState(false);
  const [isDeleteBar, setIsDeleteBar] = useState(false);

  const openitem = () => {
    setOpenItemBox((prev) => !prev);
  }

  const openDelete = () => {
    navigation.navigate('Library', { data: true });
    setOpenItemBox(false);
    setIsDeleteBar(true);
  }

  const closeDelete = () => {
    navigation.navigate('Library', { data: false });
    setIsDeleteBar(false);
  }

  return (
    <View>
      {!isDeleteBar ?
        <View style={navigationBarStyles.Container}>
          <View style={navigationBarStyles.headerContainer}>
            {isback ?
              <Ionicons
                name="arrow-back"
                size={23.5}
                color="black"
                style={{ marginHorizontal: 18, }}
                onPress={() => navigation.goBack()}
              />
              : null
            }
            <Text style={navigationBarStyles.headerTitle}>{title}</Text>
            <TouchableOpacity>
              {image ? <ImformationAlert image={image} /> : null}
            </TouchableOpacity>
          </View>

          {isdelete ?
            <Ionicons
              name="ellipsis-vertical"
              size={30}
              color="black"
              style={{ marginRight: 10 }}
              onPress={openitem}
            />
            : null
          }

          {openItemBox ?
            <View style={itemBoxStyles.container}>
              <TouchableOpacity onPress={openDelete}>
                <Text style={itemBoxStyles.itemText}>삭제</Text>
              </TouchableOpacity>
            </View>
            : null
          }
        </View>
        :
        <View style={navigationBarStyles.Container}>
          <Text style={navigationBarStyles.headerTitle}>{title} Delete</Text>
          <TouchableOpacity onPress={closeDelete}>
            <Ionicons
              name="close"
              size={30}
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

const navigationBarStyles = StyleSheet.create({
  Container: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  headerTitle: {
    marginLeft: 20,
    marginRight: 10,
    fontFamily: 'Pretendard Variable',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 22,
    color: Colors.BLACK,
  },
  menu: {
    marginHorizontal: 20,
    width: 15,
  }
});

const itemBoxStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 55,
    right: 0,
    width: 100,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
  },
  itemText: {
    paddingVertical: 5,
    fontFamily: 'Pretendard Variable',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    color: Colors.BLACK,
    textAlign: 'center',
  },
});



export default LibraryHeader;

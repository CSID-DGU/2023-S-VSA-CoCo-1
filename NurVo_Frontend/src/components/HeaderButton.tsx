import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ImformationAlert from './ImformationAlert';
import Colors from '../utilities/Color';
import { date } from 'yup';

interface LibraryHeaderProps {
  types: string,
  image?: {
    src: string,
    alt: string,
  }[];
  isDeleteAction?: boolean,
  ondelete?: (value: boolean) => void;
}

const HeaderButton = ({ types, image, isDeleteAction, ondelete }: LibraryHeaderProps) => {
  const type = types;
  const [isDelete, setIsDelete] = useState(false);

  useEffect(()=>{
    setIsDelete(isDeleteAction);
  },[isDeleteAction]);

  const openDelete = () => {
    setIsDelete(true);
    ondelete(true);
  }

  const closeDelete = () => {
    setIsDelete(false);
    ondelete(false);
  }

  return (
    <>
      {type === 'delete' &&
        (isDelete ?
          <TouchableOpacity onPress={closeDelete}>
            < Ionicons
              name="close"
              size={30}
              color="black"
            />
          </TouchableOpacity >
          :
          <TouchableOpacity onPress={openDelete}>
            <Text>편집</Text>
          </TouchableOpacity>
        )
      }

      {type === 'useInfor' &&
        <TouchableOpacity>
          {image ? <ImformationAlert image={image} /> : null}
        </TouchableOpacity>
      }
    </>
  );
};

export default HeaderButton;

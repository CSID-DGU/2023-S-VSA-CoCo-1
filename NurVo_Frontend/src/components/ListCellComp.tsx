import {
    View,
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../utilities/Color';
import { Body023, Subtitle011 } from '../utilities/Fonts';
import { layoutStyles } from '../utilities/Layout';
import { HomeScreenNavigationProp } from '../utilities/NavigationTypes';

interface ListCellProps {
    item: {
        id: number;
        name: string;
        description?: string;
        topic_id: number;
    };
    checked?: boolean;
    style: ViewStyle;
}

export function ListCell({ item, checked, style }: ListCellProps) {

    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <TouchableOpacity style={[listStyles.listCell, style]} onPress={() => {
            navigation.navigate('LessonFirstScreen', {chapterId: item.chapterId});

        }}>
            <View style={[layoutStyles.VStackContainer, style, { paddingHorizontal: 20, paddingVertical: 12, marginTop: 28 }]}>
                <Subtitle011 text={item.name} color={Colors.GRAY03} numberOfLines={1} ellipsizeMode={'tail'} />
                {item.description && (<Body023 text={item.description} color={Colors.GRAY05} numberOfLines={1} ellipsizeMode={'tail'} />)}
            </View>
            {checked && <View style={[listStyles.checkedListCell]} />}
        </TouchableOpacity>
    );
};

const listStyles = StyleSheet.create({
    listCell: {
        borderRadius: 12,
        backgroundColor: Colors.WHITE,
        shadowColor: Colors.GRAY09,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        height: 100,
    },
    checkedListCell: {
        backgroundColor: Colors.MAINGREEN,
        width: 8,
        height: 100,

        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,


        position: 'absolute',
        left: 0,
        top: 0,
    },
})
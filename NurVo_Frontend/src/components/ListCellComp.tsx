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
import { HomeStackNavigationProp } from '../utilities/NavigationTypes';

interface ListCellProps {
    item: Chapter;
    style: ViewStyle;
}

export interface Chapter {
    id: number;
    name: string;
    description?: string;
    topic_id?: number;
    topic_name?: string;
    step?: number;
    date?: string;
}

export function ListCell({ item, style }: ListCellProps) {
    const navigation = useNavigation<HomeStackNavigationProp>();

    return (
        <TouchableOpacity style={[listStyles.listCell, style]} onPress={() => {
            switch (item.step) {
                case 1:
                    navigation.navigate("LessonSecondScreen", { chapterId: item.id, chapter_name: item.name,step: 2 });
                case 2:
                    navigation.navigate("LessonThirdScreen", { chapterId: item.id, chapter_name: item.name ,step: 3 });
                default:
                    navigation.navigate('LessonFirstScreen', { chapterId: item.id, chapter_name: item.name ,step: 1 });
            }
        }}>
            <View style={[layoutStyles.VStackContainer, style, { paddingHorizontal: 20, paddingVertical: 12, marginTop: 28 }]}>
                <Subtitle011 text={item.name} color={Colors.GRAY03} numberOfLines={1} ellipsizeMode={'tail'} />
                {item.description && (<Body023 text={item.description} color={Colors.GRAY05} numberOfLines={1} ellipsizeMode={'tail'} />)}
            </View>
            {(item.step && (item.step === 1)) && <View style={[listStyles.checkedStep1]} />}
            {(item.step && (item.step === 2)) && <View style={[listStyles.checkedStep2]} />}
            {(item.step && (item.step === 3)) && <View style={[listStyles.checkedStep3]} />}
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
    checkedStep1: {
        backgroundColor: Colors.BEIGE,
        width: 8,
        height: 100,

        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,


        position: 'absolute',
        left: 0,
        top: 0,
    },
    checkedStep2: {
        backgroundColor: Colors.LIGHTGREEN,
        width: 8,
        height: 100,

        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,


        position: 'absolute',
        left: 0,
        top: 0,
    },
    checkedStep3: {
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
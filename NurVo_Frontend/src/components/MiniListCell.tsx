import { Platform, StyleSheet, View } from "react-native";
import { Body011, Body012, Body021 } from "../utilities/Fonts";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { layoutStyles, screenWidth } from "../utilities/Layout";
import Colors from "../utilities/Color";
import { Chapter } from "./ListCellComp";

interface miniCellProp {
    step: string;
    item: Chapter;
}


function fetchBackgroundColor(item: Chapter) {
    if (item.step) {
        switch (item.step) {
            case 1:
                return Colors.BEIGE;
            case 2:
                return Colors.LIGHTGREEN;
            case 3:
                return Colors.MAINGREEN
            default:
                return Colors.WHITE;
        }
    } else {
        return Colors.WHITE;
    }
}

function fetchIconColor(item: Chapter) {
    if (item.step) {
        if (item.step === 1 || item.step === 2 || item.step === 3) {
            return Colors.WHITE;
        } else {
            return Colors.GRAY07;
        }
    } else {
        return Colors.GRAY07;
    }
}
export function MiniListCell({ step, item }: miniCellProp) {
    return (
        <View style={[miniListCellStyles.Container, { marginRight: 8 , marginBottom: 12}]}>
            <View style={[layoutStyles.VStackContainer]}>
                <View style={[miniListCellStyles.Circle, { borderColor: fetchIconColor(item), backgroundColor: fetchBackgroundColor(item), marginBottom: 12}]}>
                    <Ionicons name={"checkmark-outline"} size={24} color={fetchIconColor(item)} />
                </View>
                <Body011 text={item.name} color={Colors.GRAY05} />
            </View>
        </View>
    )
}

const miniListCellStyles = StyleSheet.create({
    Container: {
        width: screenWidth / 3 - 20,
        height: 152,
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        shadowColor: Colors.GRAY09,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },

    Circle: {
        width: 32,
        height: 32,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',

        borderStyle: 'dashed',
        borderWidth: 2,
    }
});
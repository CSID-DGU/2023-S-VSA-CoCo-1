import { StyleSheet, TouchableOpacity, View } from "react-native";
import { layoutStyles } from "../utilities/Layout";
import { Body011, Body012 } from "../utilities/Fonts";
import Colors from "../utilities/Color";

interface CustomAlertProps {
    onCancle?: () => void;
    onConfirm?: () => void;

    content: string;
    cancleText?: string;
    confirmText: string;
}
export default function CustomAlert({onCancle, onConfirm, content, cancleText, confirmText}: CustomAlertProps) {
    return (
        <View style={alertStyles.AlertContainer}>
            <View style={[layoutStyles.VStackContainer, alertStyles.alertBox, { paddingHorizontal: 20, alignItems: 'flex-start' }]}>
                <View style={[layoutStyles.VStackContainer, {paddingVertical: 20}]}>
                    <Body011 text={content} color={Colors.BLACK} />

                </View>
                <View style={layoutStyles.HStackContainer}>
                    {cancleText ? <AlertButton text={cancleText ?? ""} bgColor={Colors.GRAY08} textColor={Colors.BLACK} onPress={onCancle}/> : <View/>}
                    <View style={{ width: 8 }} />
                    <AlertButton text={confirmText} bgColor={Colors.MAINGREEN} textColor={Colors.WHITE} onPress={onConfirm}/>
                </View>
            </View>
        </View>
    )
}

interface AlertButtonProps {
    text: string;
    bgColor: string;
    textColor: string;
    onPress?: () => void;
}

function AlertButton({ text, bgColor, textColor, onPress }: AlertButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[buttonStyles.button, { backgroundColor: bgColor }]}
        >
            <Body012 text={text} color={textColor} />
        </TouchableOpacity>
    );
}

const buttonStyles = StyleSheet.create({
    button: {
        flex: 1,
        borderRadius: 12,

        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const alertStyles = StyleSheet.create({
    AlertContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    alertBox: {
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 28,
        marginHorizontal: 32,
        borderRadius: 20,
        alignItems: 'center',
    },
});
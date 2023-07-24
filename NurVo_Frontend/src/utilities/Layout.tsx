import { StyleSheet, Dimensions, ViewStyle, View } from "react-native";

export const screenWidth = Dimensions.get('window').width;

interface StackProps {
    style?: ViewStyle;
}

export function HStack({ style }: StackProps) {
    return (
        <View style={[layoutStyles.HStackContainer, style]} />
    )
}

export function VStack({ style }: StackProps) {
    return (
        <View style={[layoutStyles.VStackContainer, style]} />
    )
}

export const layoutStyles = StyleSheet.create({
    HStackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    VStackContainer: {
        flexDirection: 'column',
    },
})
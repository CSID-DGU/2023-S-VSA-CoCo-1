import { StyleSheet, Text } from 'react-native';

interface FontProps {
    text: string;
    color?: string;
    style?: {};
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

export function Title01({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.title01, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Title012({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.title01_2, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Title02({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.title02, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Subtitle011({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.subtitle01_1, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Subtitle012({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.subtitle01_2, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Body011({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body01_1, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Body012({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body01_2, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Body013({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body01_3, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Body021({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body02_1, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Body022({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body02_2, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Body023({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body02_3, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Body024({ text, color, style, numberOfLines, ellipsizeMode }: FontProps){
    return(
        <Text style={[fonts.body02_4, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Subtext011({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.subtext01_1, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Subtext012({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.subtext01_2, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Subtext013({ text, color, style, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.subtext01_3, { color: color }, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

const fonts = StyleSheet.create({
    title01: {
        fontFamily: 'Pretendard Variable',
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 38,
    },
    title01_2: {
        fontFamily: 'Pretendard Variable',
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 38,
    },
    title02: {
        fontFamily: 'Pretendard Variable',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 32,
    },

    subtitle01_1: {
        fontFamily: 'Pretendard Variable',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 28,
    },
    subtitle01_2: {
        fontFamily: 'Pretendard Variable',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 28,
    },
    body01_1: {
        fontFamily: 'Pretendard Variable',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22,
    },
    body01_2: {
        fontFamily: 'Pretendard Variable',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 22,
    },
    body01_3: {
        fontFamily: 'Pretendard Variable',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '300',
        lineHeight: 22,
    },

    body02_1: {
        fontFamily: 'Pretendard Variable',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 20,
    },
    body02_2: {
        fontFamily: 'Pretendard Variable',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 20,
    },
    body02_3: {
        fontFamily: 'Pretendard Variable',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 20,
    },
    body02_4: {
        fontFamily: 'Pretendard Variable',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20,
    },
    subtext01_1: {
        fontFamily: 'Pretendard Variable',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 18,
    },
    subtext01_2: {
        fontFamily: 'Pretendard Variable',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18,
    },
    subtext01_3: {
        fontFamily: 'Pretendard Variable',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 18,
    },
});
import { StyleSheet, Text } from 'react-native';

interface FontProps {
    text: string;
    color?: string;
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

export function Title01({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.title01, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Title02({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.title02, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Subtitle011({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.subtitle01_1, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Body011({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body01_1, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Body012({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body01_2, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Body022({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body02_2, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Body023({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body02_3, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Body024({ text, color, numberOfLines, ellipsizeMode }: FontProps){
    return(
        <Text style={[fonts.body02_4, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}
export function Subtext013({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.subtext01_3, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}


export function Title01_1({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.title01_1, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Body017({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.body01_7, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    )
}

export function Subtext012({ text, color, numberOfLines, ellipsizeMode }: FontProps) {
    return(
        <Text style={[fonts.subtext01_2, { color: color }]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
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
    subtext01_3: {
        fontFamily: 'Pretendard Variable',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 18,
    },
    title01_1: {
        paddingHorizontal: 30,
        fontFamily: 'Pretendard Variable',
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 38,
    },
    body01_7: {
        paddingHorizontal: 10,
        paddingTop: 10,
        fontFamily: 'Pretendard Variable',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22,
    },
    subtext01_2: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontFamily: 'Pretendard Variable',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18,
    },
});
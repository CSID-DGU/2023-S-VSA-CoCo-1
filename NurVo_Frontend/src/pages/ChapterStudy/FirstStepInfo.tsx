import React, { useRef, useEffect, useReducer, useState } from 'react'
import { ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Colors from '../../utilities/Color';
import { layoutStyles, screenWidth } from '../../utilities/Layout';
import { View } from 'react-native-animatable';
import { Body011, Body012, Body013, Body022, Body024, Subtitle011, Subtitle012 } from '../../utilities/Fonts';
import { FirstStepInfoProp } from '../../utilities/NavigationTypes';
import { speech } from '../../utilities/TextToSpeech';
import { set } from 'date-fns';


export default function FirstStepInfo({ navigation, route }: FirstStepInfoProp) {
    const item = route.params.chapter;
    const handleStart = () => {
        navigation.navigate('LessonFirstScreen', { chapterId: item.id, chapter_name: item.name, step: item.step, isVoiceMode: isSound });
    }
    const handleSpeaker = () => {
        setIsSpeakingByIndex(true);
        speech("How are you?", 0, true, () => setIsSpeakingByIndex(false));
    }

    const [isSound, setIsSound] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const setIsSpeakingByIndex = (bool: boolean) => { setIsSpeaking(bool)};
    const toggleSwitch = () => setIsSound(previousState => !previousState);

    return (
        <ScrollView>
            <View style={[layoutStyles.VStackContainer, { paddingHorizontal: 20 }]}>
                <View style={[layoutStyles.VStackContainer, { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }]}>
                    <Subtitle011 text="문장을 들으며 학습하는 단계입니다." />
                    <Subtitle011 text="문장을 듣고, 읽고, 말해보세요." />
                    <Body013 text="이어폰 사용을 권장합니다." style={{ paddingTop: 16 }} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="headset-sharp" size={150} color={Colors.GRAY05} style={{ marginVertical: 60 }} />
                </View>
                <View style={{ marginBottom: 60 }}>
                    <View style={[layoutStyles.HStackContainer, { paddingHorizontal: 20, marginVertical: 12 }]}>
                        <Body012 text="소리 재생하기" />

                        <TouchableOpacity style={[layoutStyles.HStackContainer, isSpeaking ? styles.playingButton : styles.playButton]} onPress={handleSpeaker}>
                            <Ionicons name="play" size={20} color={Colors.WHITE} />
                            <Body022 text="Play" color={Colors.WHITE} />
                        </TouchableOpacity>
                    </View>
                    <View style={[layoutStyles.HStackContainer, { paddingHorizontal: 20, marginVertical: 12 }]}>
                        <Body012 text="음성 자동재생" />

                        <Switch
                            trackColor={{ false: Colors.GRAY05, true: Colors.MAINGREEN }}
                            thumbColor={Colors.WHITE}
                            ios_backgroundColor={Colors.GRAY05}
                            onValueChange={toggleSwitch}
                            value={isSound}
                            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginRight: 5 }}
                        />
                    </View>
                </View>
                <TouchableOpacity style={[layoutStyles.HStackContainer, styles.studyButton]} onPress={handleStart}>
                    <Body011 text="학습하기" color={Colors.WHITE} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: 'row',
        backgroundColor: Colors.BEIGE,
        alignItems: 'center',
    },
    playButton: {
        width: 70,
        height: 35,
        borderRadius: 20,
        paddingVertical: 1.5,
        paddingHorizontal: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.MAINGREEN,
    },
    playingButton: {
        width: 70,
        height: 35,
        borderRadius: 20,
        paddingVertical: 1.5,
        paddingHorizontal: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.GRAY05,
    },
    studyButton: {
        backgroundColor: Colors.MAINGREEN,
        borderRadius: 30,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth - 40,
    }
});


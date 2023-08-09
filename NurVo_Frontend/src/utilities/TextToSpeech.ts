import { SPEECH_KEY_ANDROID, SPEECH_KEY_IOS } from "@env";
import { Platform } from "react-native";
import RNFS from 'react-native-fs';
import SOUND from 'react-native-sound';

const createSpeechRequest = (text: string) => ({
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body(text)),
    method: 'POST'
})

const body = (text: string) => ({
    input: { text },
    voice: {
        languageCode: 'en-US',
        name: 'en-US-Wavenet-H',
        ssmlGender: 'FEMALE'
    },
    audioConfig: {
        audioEncoding: 'MP3'
    }
});

const createFile = async (path: string, data: string) => {
    try {
        return await RNFS.writeFile(path, data, 'base64')
    } catch (e) {
        console.warn('createFile', e)
    }
    return null
}

const playSound = (path: string, onDone: () => void) => {
    const speech = new SOUND(path, '', (e) => {
        if (e) {
            console.warn('sound failed to load the sound', e)
            return null
        }
        speech.play((success) => {
            if (!success) {
                console.warn('sound playback failed due to audio decoding errors')
            }
            onDone(); // playSound 함수가 종료될 때 전달된 콜백 함수 호출
        })
        return null
    })
}

//speech('hello world')와 같은 형식으로 사용하면 됩니다.
export const speech = async (text: string, unitID: number, chapterID: number, onDone: () => void) => {
    const key_ios = SPEECH_KEY_ANDROID;
    const key_android = SPEECH_KEY_IOS;

    const key = Platform.OS === 'ios' ? key_ios : key_android
    const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`
    const payload = createSpeechRequest(text)
    const path = `${RNFS.DocumentDirectoryPath}/voice_${unitID}_${chapterID}.mp3`
    try {
        const response = await fetch(`${address}`, payload)
        const result = await response.json()
        if (result.audioContent) {
            await createFile(path, result.audioContent);
            playSound(path, onDone);
        } else {
            console.warn('speech', result);
        }
    } catch (e) {
        console.warn('speech', e)
    }
}
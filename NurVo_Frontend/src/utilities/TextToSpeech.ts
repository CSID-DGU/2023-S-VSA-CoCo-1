import { SPEECH_KEY } from "@env";
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';

const createSpeechRequest = (text: string, voice: string, isFemale: boolean) => ({
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body(text, voice, isFemale)),
    method: 'POST'
})

const body = (text: string, voice: string, isFemale: boolean) => ({
    input: { text },
    voice: {
        languageCode: 'en-AU',
        name: voice,
        ssmlGender: isFemale ? 'FEMALE' : 'MALE'
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

export const playSound = (path: string, onDone: () => void): Sound => {
    const speech = new Sound(path, '', (e) => {
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
    return speech;
}
export let play: Sound | null = null;
//speech('hello world')와 같은 형식으로 사용하면 됩니다.
export const speech = async (text: string, chapterID: number, isNurse: boolean, onDone: () => void) => {
    const speech_key = SPEECH_KEY;

    const voice = isNurse ? 'en-US-Wavenet-H' : 'en-AU-Neural2-B'
    const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${speech_key}`
    const payload = createSpeechRequest(text, voice, isNurse)
    const path = `${RNFS.DocumentDirectoryPath}/voice_${chapterID}.mp3`
    try {
        const response = await fetch(`${address}`, payload)
        const result = await response.json()
        if (result.audioContent) {
            await createFile(path, result.audioContent);
            play = playSound(path, onDone);
        } else {
            console.warn('speech', result);
        }
    } catch (e) {
        console.warn('speech', e)
    }
}

export function stopSpeech() {
    if (play) {
        play.stop();
        play.release();
        play = null;
    }
}
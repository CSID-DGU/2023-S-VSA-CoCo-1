import axios, { AxiosError } from "axios";
import { RN_HOST_URL } from "@env";

const HOST_URL = RN_HOST_URL;

export interface ResponseProps {
    [x: string]: any;
    data: [];
}

//topic과 chpater 요청
export async function fetchAllTopic(): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues`;
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

//아이디로 챕터에 대한 설명 요청
export async function fetchChapterDescriptionById(chapterId: string): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/${chapterId}`;
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log("response data", responseData);
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchChapterDialogueById(chapterId: number): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/1/${chapterId}`;
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log("response data", responseData);
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchChapterDialogueSecondStepById(chapterId: number): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/1/${chapterId}/step2`;
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchChapterDialogueThirdStepById(chapterId: number): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/1/${chapterId}/step3`;
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

//2단계 정확도 계산(post)
export async function calculateSecondStepAccuracyWithSentenceId(chapterId: string, sentenceId: string, reply: string): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/1/${chapterId}/step2?id=${sentenceId}`;
    const data = { "reply": reply };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'aaplication/json'
            },
            body: JSON.stringify(data),
        })
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

//3단계 정확도 계산(post)
export async function calculateThirdStepAccuracyWithSentenceId(chapterId: string, sentenceId: string, reply: string): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/1/${chapterId}/step3?id=${sentenceId}`;
    const data = { "reply": reply };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

//문장 북마크 저장
export async function addSentenceBookmark(chapterId: string, sentenceId: string): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/1/${chapterId}`;
    const data = { "conversation_id": `${sentenceId}` };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

//북마크 불러오기
export async function fetchBookmark() {
    const url = `${HOST_URL}/api/bookmark`;
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}
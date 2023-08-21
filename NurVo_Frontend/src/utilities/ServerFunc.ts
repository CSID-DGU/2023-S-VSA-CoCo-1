import axios, { AxiosError } from "axios";
import { RN_HOST_URL, RN_IOS_HOST_URL, TEST_TOKEN, TEST_USERID } from "@env";
import { Section } from "../pages/LessonsList";
import { Platform } from "react-native";
import { retrieveUserSession } from "./EncryptedStorage";

const HOST_URL = (Platform.OS === 'ios') ? RN_IOS_HOST_URL : RN_HOST_URL;
const TOKEN = TEST_TOKEN;
const USER_ID = TEST_USERID;

export interface ResponseProps {
    [x: string]: any;
    data: [] | {};
}

//topic과 chpater 요청
export async function fetchAllTopic(): Promise<Section[] | undefined> {
    const url = `${HOST_URL}/api/dialogues`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TEST_TOKEN
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

//아이디로 챕터에 대한 설명 요청
export async function fetchChapterDescriptionById(chapterId: string): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/${chapterId}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchChapterDialogueById(chapterId: number): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/${chapterId}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchChapterDialogueSecondStepById(chapterId: number): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/${chapterId}/step2`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchChapterDialogueThirdStepById(chapterId: number): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/${chapterId}/step3`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

//2단계 정확도 계산(post)
export async function calculateSecondStepAccuracyWithSentenceId(chapterId: number, sentenceId: string, reply: string): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/${chapterId}/step2?id=${sentenceId}`;
    const data = { "reply": reply };
    const headers = { 'Authorization': `Bearer ${TOKEN}` };
    try {
        const response = await axios.post<ResponseProps>(url, data, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(axiosError.message);
        } else {
            console.error(error);
        }
    }
}
//3단계 정확도 계산(post)
export async function calculateThirdStepAccuracyWithSentenceId(chapterId: number, sentenceId: string, reply: string): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues/${chapterId}/step3?id=${sentenceId}`;
    const data = { "reply": reply };
    const headers = { 'Authorization': `Bearer ${TOKEN}` };
    try {
        const response = await axios.post<ResponseProps>(url, data, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(axiosError.message);
        } else {
            console.error(error);
        }
    }
}

//문장 북마크 저장
export async function addSentenceBookmark(sentenceId: number): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/bookmark/`;
    const data = { "conversation_id": `${sentenceId}` };
    const headers = { 'Authorization': `Bearer ${TOKEN}` };
    try {
        const response = await axios.post<ResponseProps>(url, data, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(axiosError.message);
        } else {
            console.error(error);
        }
    }
}

//문장 북마크 삭제
export async function deleteSentenceBookmark(sentenceId: number): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/bookmark/delete`;
    const data = [sentenceId];
    const headers = { 'Authorization': `Bearer ${TOKEN}` };
    try {
        const response = await axios.post<ResponseProps>(url, data, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(axiosError.message);
        } else {
            console.error(error);
        }
    }
}

//라이브러리에서 북마크 삭제
export async function deleteLibraryBookmark(sentenceId: []): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/bookmark/delete`;
    const USER_TOKEN = await retrieveUserSession(); // 자동 로그인 시 스토리지에 있는 토큰 가져온 후 데이터 불러오기
    const data = sentenceId;
    const headers = { 'Authorization': `Bearer ${USER_TOKEN}` };
    try {
        const response = await axios.post<ResponseProps>(url, data, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(axiosError.message);
        } else {
            console.error(error);
        }
    }
}

//북마크 불러오기
export async function fetchBookmark() {
    const url = `${HOST_URL}/api/bookmark`;
    const USER_TOKEN = await retrieveUserSession(); // 자동 로그인 시 스토리지에 있는 토큰 가져온 후 데이터 불러오기
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + USER_TOKEN
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

//학습완료
export async function completeChapter(chapterId: number, step: number): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/edu`;
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const data = {
        "chapter_id": chapterId,
        "step": step,
        "date": date
    };
    console.log(data);
    const headers = { 'Authorization': `Bearer ${TOKEN}` };
    try {
        const response = await axios.post<ResponseProps>(url, data, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(axiosError.message);
        } else {
            console.error(error);
        }
    }
}

export async function fetchTodaysLesson(): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/edu/todayLessons`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

//Reviews
export async function fetchReviews(): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/edu/review`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

//회원 정보 불러오기
export async function fetchMypage() {
    const url = `${HOST_URL}/api/auth/mypage`;
    const USER_TOKEN = await retrieveUserSession(); // 자동 로그인 시 스토리지에 있는 토큰 가져온 후 데이터 불러오기
    console.log(USER_TOKEN);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + USER_TOKEN
            }
        });
        const userInfo = await response.json();
        return userInfo;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
}

// 사용자 목표 변경
export async function updateUserInfo(updateData: {}) {
    const url = `${HOST_URL}/api/auth/mypage`;
    const USER_TOKEN = await retrieveUserSession(); // 자동 로그인 시 스토리지에 있는 토큰 가져온 후 데이터 불러오기
    const data = updateData;
    const headers = { 'Authorization': `Bearer ${USER_TOKEN}` };
    try {
        const response = await axios.post<ResponseProps>(url, data, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(axiosError.message);
        } else {
            console.error(error);
        }
    }
}

// 로그인화면에서 로그인
export async function fetchLogin(loginData: {}) {
    const url = `${HOST_URL}/api/auth/login`;
    const data = loginData;
    try {
        const response = await axios.post<ResponseProps>(url, data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(axiosError.message);
            console.log("에러");
        } else {
            console.error("login", error);
        }
    }
}
import axios, { AxiosError } from "axios";
import { RN_HOST_URL, TEST_TOKEN } from "@env";

const HOST_URL = RN_HOST_URL;
const TOKEN = TEST_TOKEN;

export interface ResponseProps {
    [x: string]: any;
    data: [];
}

//topic과 chpater 요청
export async function fetchAllTopic(): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/dialogues`;
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
export async function calculateSecondStepAccuracyWithSentenceId(chapterId:number, sentenceId: string, reply: string): Promise<ResponseProps | undefined> {
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
export async function calculateThirdStepAccuracyWithSentenceId(chapterId:number, sentenceId: string, reply: string): Promise<ResponseProps | undefined> {
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
export async function addSentenceBookmark(sentenceId: number, userId: string): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/bookmark/`;
    const data = { "conversation_id": `${sentenceId}`, "user_id": `${userId}`};
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
export async function deleteSentenceBookmark( sentenceId: number, userId: string): Promise<ResponseProps | undefined> {
    const url = `${HOST_URL}/api/bookmark/delete`;
    const data = { "conversation_id": [`${sentenceId}`], "user_id": `${userId}`};
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

//라이브러리에서 북마크 삭제
export async function deleteLibraryBookmark( sentenceId: [] ): Promise<ResponseProps | undefined> {
  const url = `${HOST_URL}/api/bookmark/delete`;
  const data = sentenceId;
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

//북마크 불러오기
export async function fetchBookmark() {
    const url = `${HOST_URL}/api/bookmark`;
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
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + TOKEN
      }
    });
    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}

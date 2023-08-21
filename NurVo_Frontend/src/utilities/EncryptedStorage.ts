import EncryptedStorage from 'react-native-encrypted-storage';

// 저장
export async function storeUserSession(data: string) {
  try {
    console.log(" 잘들어왔느냐: ", data);
    await EncryptedStorage.setItem("ACCESS_SECRET", JSON.stringify(data));
  } catch (error) {
    console.log(error)
  }
}

// 불러오기
export async function retrieveUserSession() {
  try {
    const token = await EncryptedStorage.getItem("ACCESS_SECRET");

    if (token !== undefined) {
      const modify = token.replace(/^"|"$/g, '');
      return modify;
    }
  } catch (error) {
    console.log(error)
  }
}

// 지정 삭제
export  async function removeUserSession() {
  try {
    await EncryptedStorage.removeItem("ACCESS_SECRET");
  } catch (error) {
      console.log(error)
  }
}
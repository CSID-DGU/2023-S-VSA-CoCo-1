import { getDialogues, getSentences } from "../db/db.mjs";

export async function FilterDialogues(list_id) {
  const firstStep = await getDialogues(list_id);
  const result = firstStep.map((firstStep) => {
    return {
      id: firstStep.id,
      speaker: firstStep.speaker,
      dialogue: firstStep.dialogue,
      korean: firstStep.korean,
    };
  });
  return result;
};

export async function FilterNurse(list_id) {
  const secondStep = await getDialogues(list_id);
  const result = secondStep.map((secondStep) => {
    if(secondStep.speaker === "Nurse" || secondStep.speaker === "nurse") {
      return {
        id: secondStep.id,
        speaker: secondStep.speaker,
        second_step: secondStep.second_step,
        korean: secondStep.korean,
      };
    } else {
      return {
        id: secondStep.id,
        speaker: secondStep.speaker,
        dialogue: secondStep.dialogue,
        korean: secondStep.korean,
      };
    };
    }
  );
  return result;
};

//정확도 계산 함수
function calculateAccuracy(referenceSentence, userAnswer) {
  // 문장을 공백을 기준으로 단어로 분할하여 배열 생성
  const referenceWords = referenceSentence.trim().split(' ');
  const userAnswerWords = userAnswer.trim().split(' ');


  const minLength = Math.min(referenceWords.length, userAnswerWords.length);
  const maxLength = Math.max(referenceWords.length, userAnswerWords.length);

  let matchedWords = 0;

  // 두 배열의 각 요소를 비교하여 일치하는 단어의 개수 계산
  for (let i = 0; i < minLength; i++) {
    if (referenceWords[i].toLowerCase() === userAnswerWords[i].toLowerCase()) {
      matchedWords++;
    }
  }

  // 정확도를 계산하고 퍼센트로 변환
  const accuracy = (matchedWords / maxLength) * 100;
  return accuracy.toFixed(2); // 소수점 두 자리까지 반올림하여 반환
}


// 대화학습 2,3단계에서 클라이언트에서 보낸 응답을 바탕으로 정확도 계산
export async function Accuracy(id, reply){ // 문장별 id와 reply(클라이언트에서 받은 사용자의 대답)
  const answer = await getSentences(id);
  const accuracy = calculateAccuracy(answer, reply);
  console.log(accuracy)
  return {    // 응답으로 정확도와 정답 보냄
    accuracy: accuracy,
    answer: answer,
  };
}

// 대화학습 3단계 클라이언트로 보낼 데이터
export async function FilterNurse_ThirdStep(list_id) {  
  const thirdStep = await getDialogues(list_id);
  const result = thirdStep.map((thirdStep) => {
    if(thirdStep.speaker === "Nurse" || thirdStep.speaker === "nurse") {  // speaker가 간호사일 경우 대화 비움
      return {
        id: thirdStep.id,
        speaker: thirdStep.speaker,
        dialogue: "",
        korean: thirdStep.korean,
      };
    }
    else{   // speaker가 간호사가 아닐경우(환자) 대화내용 그대로
      return{
        id: thirdStep.id,
        speaker: thirdStep.speaker,
        dialogue: thirdStep.dialogue,
        korean: thirdStep.korean,
      }
    }
  })
  return result;
}
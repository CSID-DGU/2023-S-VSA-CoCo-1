
export function generateRandomSixDigitNumber() {
  // 100000 이상 1000000 미만의 난수 생성
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  // 생성된 숫자를 반환
  return randomNumber;
};

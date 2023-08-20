import { getAttendance } from "../db/db.mjs";


export function dateToDay() {
  const today = new Date();

  const dayOfWeek = today.getDay();
  let dayName = '';
  switch (dayOfWeek) {
    case 0:
      dayName = 'Sun';
      break;
    case 1:
      dayName = 'Mon';
      break;
    case 2:
      dayName = 'Tue';
      break;
    case 3:
      dayName = 'Wed';
      break;
    case 4:
      dayName = 'Thu';
      break;
    case 5:
      dayName = 'Fri';
      break;
    case 6:
      dayName = 'Sat';
      break;
    default:
      dayName = '알 수 없는 요일';
  }

  return dayName;
}

export function stringDate(date) {
    // 오늘 날짜 객체 생성
    const today = date || new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0'); 
  
    // YYYY.MM.DD 형태로 날짜 문자열 생성
    const formattedDate = `${year}.${month}.${day}`;

    return formattedDate;
}

export async function checkRedup(user_id){
  const attendances = await getAttendance(user_id);

  const today = stringDate();
  if(attendances.length !== 0) {
    const checkAttendance = attendances.some((atten) => {
      const dates = stringDate(atten.date);
      return dates === today
    });
    return checkAttendance;
  } else {
    return false;
  }
  
};

export async function attendancOnWeek(user_id) {
  const attendances = await getAttendance(user_id);

  const today = new Date();

  let firstDayOfWeek
  let lastDayOfWeek

  // 이번주의 첫 번째 날짜
  if(today.getDay() === 0) {
    firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() -6);
  } else {
    firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
  }

  // 이번주의 마지막 날짜
  if(today.getDay() !== 0) {
    lastDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay() + 1));
  } else {
    lastDayOfWeek = today;
  }
  

  // 이번주 날짜 배열
  const thisWeekDates = [];
  let currentDate = firstDayOfWeek;
  while (currentDate <= lastDayOfWeek) {
    thisWeekDates.push(stringDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  };

  console.log(thisWeekDates);
 
  const thisWeekAtten = attendances.filter((atten) => {
    const dateItem = stringDate(atten.date);
    console.log(dateItem)
    return thisWeekDates.includes(dateItem);
  })
  .map(even => {
    return {
      day: even.day
    }
  });


  return thisWeekAtten;
}
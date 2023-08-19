export function CalculateWeekDay() {
  const utcOffset = 9 * 60 * 60 * 1000;   // 9시간에 대한 ms로 UTC+9 시간대 맞추기 위해 필요
  const today = new Date(new Date().getTime() + utcOffset);

  const monday = new Date(new Date().getTime() + utcOffset);  // 이번주 월요일
  monday.setDate(today.getDate() - today.getDay() + 1);   // getDate: 몇일인지, getDay: 요일에따라 월:1 ~일:7 => 월요일 계산

  const sunday = new Date(new Date().getTime() + utcOffset);  // 이번주 일요일
  sunday.setDate(today.getDate() - today.getDay() + 7);   // 일요일 계산

  // "YYYY-MM-DD" 형식으로 변환
  function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  const resultMonday = formatDate(monday);
  const resultSunday = formatDate(sunday);
  
  return {
    monday: resultMonday,
    sunday: resultSunday
  };
};
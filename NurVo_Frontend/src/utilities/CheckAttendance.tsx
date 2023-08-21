import AsyncStorage from "@react-native-async-storage/async-storage";


const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const updateAttendance = async () => {
    try {
        const today = new Date();
        const dayOfWeek = DAYS[today.getDay()];
        const storedData = await AsyncStorage.getItem('attendance');
        const attendanceData = storedData ? JSON.parse(storedData) : {};
        if (attendanceData.lastUpdate && new Date(attendanceData.lastUpdate).getDay() === 0 && dayOfWeek !== 'Sunday') {
            // reset attendance data after Sunday
            await AsyncStorage.setItem('attendance', JSON.stringify({}));
        } else {
            // update attendance data for the current day
            attendanceData[dayOfWeek] = true;
            attendanceData.lastUpdate = today.toISOString();
            await AsyncStorage.setItem('attendance', JSON.stringify(attendanceData));
        }
    } catch (error) {
        console.error(error);
    }
};

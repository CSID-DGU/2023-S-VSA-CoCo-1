import express from 'express'
import { saveAttendance } from '../db/db.mjs';
import { checkRedup, attendancOnWeek } from '../services/attendance.mjs';

export const router = express.Router();

router.get('/', addAttendance);

async function addAttendance(req, res) {
  try{
    const user_id = req.user.id;
    const check = await checkRedup(user_id);
    const userAttendance = await attendancOnWeek(user_id);

    if(check === false){
      await saveAttendance(user_id);
      res.status(200).send(userAttendance);
    } else {
      res.send(userAttendance);
    }

  } catch (err) {
    console.error(err);
    res.send({"message":"저장실패"});
  };
}
import express from 'express';
import {saveCompletedLearning} from '../db/db.mjs';

export const router = express.Router();

router.post('/', saveEdu);


async function saveEdu(req, res) {   // date, chapter_id, step 저장
  const data = req.body;
  const user_id = req.user.id;

  await saveCompletedLearning(user_id, data);
  
  res.status(200).send({"message":"save"});
};
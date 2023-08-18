import express from 'express';
import {saveCompletedLearning, getCompletedChapter, getAllTodayLessons} from '../db/db.mjs';

export const router = express.Router();

router.post('/', saveEdu);  // 학습완료시 저장
router.get('/review', getChapterForReview); // Review탭에서 불러올 학습완료 내역
router.get('/todayLessons', getTodayLessons);

async function saveEdu(req, res) {   // date, chapter_id, step 저장
  const data = req.body;
  const user_id = req.user.id;

  await saveCompletedLearning(user_id, data);
  
  res.status(200).send({"message":"save"});
};

// topic_name, chapter_id, chapter_name, step, date 불러옴
async function getChapterForReview(req, res) {
  const user_id = req.user.id;

  const result = await getCompletedChapter(user_id);
  const filterResult = result.filter(data => data.step == 3);  // 학습결과 step이 3인경우(학습완료)인 경우만 클라이언트로

  res.status(200).send(filterResult)
}

async function getTodayLessons(req, res) {
  const id = req.user.id;

  const result = await getAllTodayLessons(id)
  res.status(200).send(result);
}
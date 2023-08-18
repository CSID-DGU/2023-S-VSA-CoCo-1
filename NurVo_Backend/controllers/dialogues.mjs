import express from 'express';
import { ChapterByTopic } from '../services/chapter.mjs';
import { FilterDialogues, FilterNurse, FilterNurse_ThirdStep, Accuracy } from '../services/dialogue.mjs';

export const router = express.Router();
router.get('/', getChapters);
router.get('/:thema', getDialogues);
router.get('/:thema/step2', getSecondStep);
router.get('/:thema/step3', getThirdStep);
router.post('/:thema/step2', checkAnswerSecondStep);
router.post('/:thema/step3',checkAnswerThirdStep)

async function getChapters (req, res) {
  try {
    const thema = await ChapterByTopic();
    res.status(200).send(thema);
  }
  catch (err) {
    console.error(err);
    res.status(500);
  };
};

async function getDialogues (req, res) {
  try {
    const user_id = req.user.id;
    const conversation = await FilterDialogues(req.params.thema, user_id);
    res.status(200).send(conversation);
  }
  catch (err) {
    console.error(err);
  };
};


async function getSecondStep (req, res) {
  try {
    const user_id = req.user.id
    const secondStep = await FilterNurse(req.params.thema, user_id);
    res.status(200).send(secondStep);
  } catch (err) {
    console.error(err);
  };
};

async function getThirdStep (req, res) {
  try{
    const user_id = req.user.id;
    const thirdStep = await FilterNurse_ThirdStep(req.params.thema, user_id);
    res.status(200).send(thirdStep);
  }
  catch (err) {
    console.error(err);
  }
}

//step2 
async function checkAnswerSecondStep(req, res) {  //http://localhost:5000/api/dialogues/1/2/step2?id=1 형식으로 post요청해야함 
  try{  
    const result = await Accuracy(req.query.id, req.body.reply);  //쿼리문으로 작성된 id값 과 body로 전송된 reply(사용자 응답)
    res.status(200).send(result);
  }
  catch(err) {
    console.error(err);
  }
}

//step3
async function checkAnswerThirdStep(req, res) {
  try{
    const result = await Accuracy(req.query.id, req.body.reply);
    res.status(200).send(result);
  }
  catch(err) {
    console.error(err);
  }
}






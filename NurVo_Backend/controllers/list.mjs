import express from 'express';
import { FilterDialogues, FilterNurse, FilterNurse_ThirdStep, Accuracy } from '../services/dialogue.mjs';
import { getDialogueOfBookemark } from '../services/bookmark.mjs';

export const router = express.Router();
router.get('/:list', getDialogues);
router.get('/:list/step2', getSecondStep);
router.get('/:list/step3', getThirdStep);
router.post('/:list/step2', checkAnswerSecondStep);
router.post('/:list/step3',checkAnswerThirdStep)

async function getDialogues (req, res) {
  try {
    const conversation = await FilterDialogues(req.params.list);
    res.status(200).send(conversation);
  }
  catch (err) {
    console.error(err);
  };
};

async function getSecondStep (req, res) {
  try {
    const secondStep = await FilterNurse(req.params.list);
    res.status(200).send(secondStep);
  } catch (err) {
    console.error(err);
  };
};

async function getThirdStep (req, res) {
  try{
    const thirdStep = await FilterNurse_ThirdStep(req.params.list);
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


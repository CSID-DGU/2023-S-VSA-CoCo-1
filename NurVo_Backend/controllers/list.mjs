import express from 'express';
import { FilterDialogues, FilterNurse } from '../services/dialogue.mjs';
import { getDialogueOfBookemark } from '../services/bookmark.mjs';
import { saveBookemark } from '../db/db.mjs';

export const router = express.Router();
router.get('/:list', getDialogues);
router.get('/:list/step2', getSecondStep);
router.post('/:list', saveBookemarkForDB);

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

async function saveBookemarkForDB(req, res) {
  try {
    const conversation_id = req.body.conversation_id;
    console.log(conversation_id);
    await saveBookemark(conversation_id);
    res.status(200).send({"message":"save"});
  } catch (err) {
    console.error(err);
  };
};
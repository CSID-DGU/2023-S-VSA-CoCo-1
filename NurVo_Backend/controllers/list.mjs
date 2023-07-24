import express from 'express';
import { FilterDialogues, FilterNurse } from '../services/dialogue.mjs';

export const router = express.Router();
router.get('/:list', getDialogues);
router.get('/:list/step2', getSecondStep);

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
import express from 'express';
import { ChapterByTopic, ChapterById } from '../services/chapter.mjs';

export const router = express.Router();
router.get('/', getChapters);
router.get('/:thema', getDialogues);

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
    const thema = await ChapterById(req.params.thema);
    console.log(thema);
    res.status(200).send(thema);
  }
  catch (err) {
    console.error(err);
  };
}




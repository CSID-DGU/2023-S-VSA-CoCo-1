import express from 'express';
import { getDialogueOfBookemark } from '../services/bookmark.mjs';

export const router = express.Router();

router.get('/', getBookmark);

async function getBookmark(req, res) {
  try {
    const bookmark = await getDialogueOfBookemark();

    console.log(bookmark);

    res.status(200).send(bookmark);

  } catch (err) {
    console.err(err);
    res.send({"message":"로드실패"});
  };
};
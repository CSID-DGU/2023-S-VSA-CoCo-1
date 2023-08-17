import express from 'express';
import { getDialogueOfBookemark } from '../services/bookmark.mjs';
import { saveBookemark, deleteBookmark } from '../db/db.mjs';

export const router = express.Router();

router.get('/', getBookmark);
router.post('/', addBookmark);
router.post('/delete', deleteBookmarks);

async function getBookmark(req, res) {
  try {
    const user_id = req.user.id;
    const bookmark = await getDialogueOfBookemark(user_id);

    console.log(bookmark);

    res.status(200).send(bookmark);

  } catch (err) {
    console.err(err);
    res.send({"message":"로드실패"});
  };
};

async function addBookmark(req, res) {
  try {
    const user_id = req.user.id;
    const conversation_id = req.body.conversation_id;
    console.log(conversation_id);
    await saveBookemark(conversation_id, user_id);
    res.status(200).send({"message":"save"});
  } catch (err) {
    console.error(err);
  };
};

async function deleteBookmarks(req, res) {
  try {
    const user_id = req.user.id;
    const conversationIds = req.body;
    for (const conversationId of conversationIds) {
      await deleteBookmark(conversationId, user_id);
    }

    const bookmark = await getDialogueOfBookemark(user_id);
    res.status(200).send(bookmark);


  } catch (err) {
    console.error(err);
  };
};
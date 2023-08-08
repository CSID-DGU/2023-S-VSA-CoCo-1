import { getBookmark, getDialogues, getChapter } from "../db/db.mjs";

export async function getDialogueOfBookemark (user_id) {

  const bookmark = await getBookmark(); //나중에는 user_id 넣어서 요청
  const dialogues = await getDialogues();
  const chapter = await getChapter();

  console.log(bookmark);

  const bookmarkDialogues = bookmark.map((bm) => {
    const dialogueInfo = dialogues.find((dialogue) => dialogue.id === bm.conversation_id);
    
    const chpaterInfo = chapter.find((element) => element.id === dialogueInfo.chapter_id);

    return {
      conversation_id: dialogueInfo.id,
      dialogue: dialogueInfo.dialogue || '',
      korean: dialogueInfo.korean || '',
      date: bm.date || '',
      chapter: chpaterInfo.name,
    };
  });
  return bookmarkDialogues;
}
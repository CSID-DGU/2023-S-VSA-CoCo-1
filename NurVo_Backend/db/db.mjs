import pg from 'pg';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const pool = new pg.Pool({
  host : DB_HOST,
  user : DB_USER,
  database : "postgres",
  password : DB_PASSWORD,
});

//topic 가지고 오는 함수
export const getTopic = async () => {
  const client = await pool.connect();
  try {
    const topic = await client.query('SELECT * FROM topic');

    return topic.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  };
};

//chapter 가지고 오는 함수.
export const getChapter = async () => {
  const client = await pool.connect();
  try {
    const chapters = await client.query('SELECT * FROM chapter');
    return chapters.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  };
};

//대화문 가지고 오는 함수
export const getDialogues = async (chapter_id) => {
  const client = await pool.connect();
  try {
    if(chapter_id) {
      const conversation = await client.query('SELECT * FROM conversation WHERE chapter_id = $1', [chapter_id]);
      return conversation.rows;
    } else {
      const conversation = await client.query('select * from conversation');
      return conversation.rows;
    };
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

//북마크 저장 함수
export const saveBookemark = async (dialogue_id, user) => {
  const user_id = user || "coco1234"; // test할 때 사용할 계정이 coco1234
  const client = await pool.connect();
  // 오늘 날짜 객체 생성
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0'); 

  // YYYY.MM.DD 형태로 날짜 문자열 생성
  const formattedDate = `${year}.${month}.${day}`;

  let result;

  try {
    await client.query('insert into bookmark (user_id, conversation_id, date) values ($1, $2, $3)', [user_id, dialogue_id, formattedDate]);
    console.log(user_id, dialogue_id, formattedDate);
    result = "success"
    console.log("북마크 저장 완료");
    return result;
  } catch (err) {
    console.error(err);
    result = "fail"
    return result;
  } finally {
    client.release();
  };
};

export const getBookmark = async (user) => {
  const user_id = user || "coco1234";
  const client = await pool.connect();

  try {
    const bookmark = await client.query('select conversation_id, date from bookmark where user_id = $1', [user_id]);
    return bookmark.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  };
};

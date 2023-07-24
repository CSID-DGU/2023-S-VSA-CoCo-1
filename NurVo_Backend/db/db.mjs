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
    const conversation = await client.query('SELECT * FROM conversation WHERE chapter_id = $1', [chapter_id]);
    return conversation.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};


import pg from 'pg';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

//데이터베이스 연결 정보 
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const pool = new pg.Pool({
  host : DB_HOST,
  user : DB_USER,
  database : "postgres",
  password : DB_PASSWORD,
});

//사용자 정보 불러오기
export const getUser = async (id) => {
  const client = await pool.connect();
  try {
    if(id){ //id가 있으면 해당 id의 유저 정보만 가지고 옴
      const user = await client.query('SELECT * FROM public.user WHERE id = $1', [id]);
      return user.rows[0];
    }else{ //id가 없으면 모든 유저 정보를 가지고 옴
      const user = await client.query('SELECT * FROM public.user');
      return user.rows;
    }
    
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  };
};

//사용자 정보 저장하기
export const saveUser = async (userInfo) => { //userInfo는 id, name, password, email, phone_number를 가지고 있음  
  const client = await pool.connect();
  try { //회원정보 저장
    const user = await client.query('INSERT INTO public.user (id, name, phone_number, password, nickname) VALUES ($1, $2, $3, $4, $5)', [userInfo.id, userInfo.name, userInfo.phone_number, userInfo.password, userInfo.nickname]);
    return user.rows[0];
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  };
};

//사용자 정보 수정하기
export const updateUser = async (userInfo) => { 
  const client = await pool.connect();
  try { //회원정보 수정
    if(!userInfo.obj_date) {
      await client.query('UPDATE public.user SET obj = $1 WHERE id = $2', [userInfo.obj, userInfo.id]);
    } else if(!userInfo.obj) {
      await client.query('UPDATE public.user SET obj_date = $1 WHERE id = $2', [userInfo.obj_date, userInfo.id]);
    } else {
     await client.query('UPDATE public.user SET obj = $1, obj_date = $2 WHERE id = $3', [userInfo.obj, userInfo.obj_date, userInfo.id]);
    };
    const user = await client.query('SELECT * FROM public.user WHERE id = $1', [userInfo.id]);
    return user.rows[0];
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  };
};

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

//대화문의 문장을 각 문장의 id로 가지고 오는 함수
export const getSentences = async(id) => {
  const client = await pool.connect();
  try{
    const sentence = await client.query('SELECT * FROM conversation WHERE id = $1', [id]);
    return sentence.rows[0].dialogue;
  } catch(err) {
    console.error(err);
  } finally {
    client.release();
  }
  
}

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

export const deleteBookmark = async (dialogue_id, user) => {
  const user_id = user || "coco1234";
  const client = await pool.connect();
  try {
    await client.query('delete from bookmark where user_id = $1 and conversation_id = $2', [user_id, dialogue_id]);
    console.log("북마크 삭제 완료");
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  };
};
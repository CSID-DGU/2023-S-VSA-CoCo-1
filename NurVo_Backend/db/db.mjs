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
    const user = await client.query('INSERT INTO public.user (id, name, email, phone_number, password) VALUES ($1, $2, $3, $4, $5)', [userInfo.id, userInfo.name, userInfo.phone_number, userInfo.email, userInfo.password]);
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

// 학습 완료 시 저장 -  date, chapter_id, step
export const saveCompletedLearning = async (user_id, data) => {
  const client = await pool.connect();
  try{
    const check = await client.query('select * from edu where user_id = $1 and chapter_id = $2', [user_id, data.chapter_id])
    if(check.rows[0]){  // 이미 학습한 chapter_id 일 경우 date, step 업데이트
      console.log(check)
      await client.query('update edu set date = $1, step = $2 where user_id = $3 and chapter_id = $4', [
        data.date, data.step, user_id, data.chapter_id
      ])
      console.log("완료된 학습 업데이트 성공")
    }
    else{   // 학습하지 않은 chapter_id 일경우 새롭게 insert
      await client.query('insert into edu (id, user_id, date, chapter_id, step) values (default, $1, $2, $3, $4)', [
        user_id, data.date, data.chapter_id, data.step
      ])
      console.log("완료된 학습 저장 성공")
    }
  } catch(err) {
    console.error(err);
  } finally {
    client.release();
  }
}
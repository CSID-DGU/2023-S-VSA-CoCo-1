import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { router as listRouter } from './controllers/list.mjs';
import { router as dialoguesRouter } from './controllers/dialogues.mjs';
import { router as bookmarkRouter} from './controllers/bookmark.mjs'
import {router as signupRouter} from './controllers/signup.mjs'

const app = express();
app.use(bodyParser.json());
cors({credentials: true, origin: true});
app.use(cors());

app.get('/', (req, res) => {
  res.send('NurseVoice!');
});


app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

//get 요청으로 "/api/dialogue"하면 모든 토픽과 챕터
//get 요청으로 "/api/dialogue/chapter_id" 하면 그 챕터에 대한 정보만
//get 요청으로 "/api/dialogue/chapter_id/chapter_id"하면 그 챕터에 대한 대화문
//post 요청으로 "/api/dialogue/chapter_id/chapter_id"하고 body에 {conversation_id : ""} 추가해서 보내면 그 문장 북마크에 저장
//get 요청으로 "/api/dialogue/chapter_id/chapter_id/step2" 하면 2단계에서 빈칸으로 뚫어놓을 곳 문장(또는 단어) 전송
//get 요청으로 "/api/bookmark"하면 해당 유저에 대한 북마크 불러옴
app.use('/api/dialogues/:thema', listRouter);
app.use('/api/dialogues', dialoguesRouter);
app.use('/api/bookmark', bookmarkRouter);
app.use('/api/signup', signupRouter);



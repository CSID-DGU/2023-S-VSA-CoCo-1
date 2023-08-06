import bcrpt from "bcrpt"
import express from 'express';
import { getUser, saveUser } from '../db/db.mjs';
import dotenv from 'dotenv';
import coolsms from 'coolsms-node-sdk';
import { generateRandomSixDigitNumber } from "../services/signup.mjs";

dotenv.config();

export const router = express.Router();

//sms를 보내기 위한 api 키 및 시크릿 키
const IDENTIFY_API_KEY = process.env.IDENTIFY_API_KEY;
const IDENTIFY_API_SECRET = process.env.IDENTIFY_API_SECRET;
const messageService = new coolsms({IDENTIFY_API_KEY, IDENTIFY_API_SECRET});


router.post('/', signup);
router.get('/:id', checkId); //겹치는 id 있나 확인하는 엔드포인트
router.post('/identify', identify); //인증번호 발송하는 엔드포인트


async function signup(req, res) {
  const { id, name, password, email, phone_number } = req.body;
  try {
    const user = await getUser();
    for(let i=0; i<user.length; i++){ //이미 회원가입 되어있는 유저인지 확인
      if(user[i].name === name && (user[i].phone_number === phone_number || user[i].email === email)){
        res.send({"message":"기존에 회원가입 되어있는 유저입니다."});
        break;
      }
    }
    const hashedPassword = await bcrpt.hash(password, 10); //비밀번호 해시화
    const userInfo = {
      id: id,
      name: name,
      password: hashedPassword,
      email: email,
      phone_number: phone_number
    };
    await saveUser(userInfo);
    res.send({ "message": "회원가입 성공" });
  }
  catch (err) {
    console.error(err);
  }
};

async function checkId(req, res) {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    if (user) {
      res.send({ "message": "이미 존재하는 아이디입니다" });
    } else {
      res.send({ "message": "사용 가능한 아이디입니다." });
    }
  }
  catch (err) {
    console.error(err);
  }
};

async function identify(req, res) { //사용자 인증번호 발송
  const { phone_number, Certification } = req.body;
  try {

    const randomSixDigitNumber = generateRandomSixDigitNumber();
    const params = {
      to: phone_number,
      from: process.env.SMS_FROM,
      type: 'SMS',
      text: `[NurVo]인증번호는 ${randomSixDigitNumber} 입니다.`,
    };

    if(Certification) {
      if(Certification === randomSixDigitNumber){
        res.send({"message":"인증번호가 일치합니다."});
      } else {
        res.send({"message":"인증번호가 일치하지 않습니다."});
      }
    }else {
    const response = await messageService.send(params);
    res.send({ "Message": "발송되었습니다" });
  }

  }
  catch (err) {
    console.error(err);
  }
}
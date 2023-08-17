import bcrypt from "bcrypt"
import express from 'express';
import { getUser, saveUser } from '../db/db.mjs';
import dotenv from 'dotenv';
import { generateRandomSixDigitNumber } from "../services/signup.mjs";
import coolsms from "coolsms-node-sdk";

dotenv.config();

export const router = express.Router();

const coolsmsMessageService = coolsms.default;

//sms를 보내기 위한 api 키 및 시크릿 키
const IDENTIFY_API_KEY = process.env.IDENTIFY_API_KEY;
const IDENTIFY_API_SECRET = process.env.IDENTIFY_API_SECRET;
const messageService = new coolsmsMessageService(IDENTIFY_API_KEY, IDENTIFY_API_SECRET);

let randomSixDigitNumber;

router.post('/', signup);
router.post('/id', checkId); //겹치는 id 있나 확인하는 엔드포인트
router.post('/identify', identify); //인증번호 발송하는 엔드포인트


async function signup(req, res) {
  const { id, name, password, phone_number, nickname } = req.body;
  try {
    const user = await getUser();
    for(let i=0; i<user.length; i++){ //이미 회원가입 되어있는 유저인지 확인
      if(user[i].name === name && (user[i].phone_number === phone_number )){
        res.send({"message":"기존에 회원가입 되어있는 유저입니다."});
        break;
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10); //비밀번호 해시화
    const userInfo = {
      id: id,
      name: name,
      password: hashedPassword,
      phone_number: phone_number,
      nickname: nickname,
    };
    await saveUser(userInfo);
    res.send({ "message": "회원가입 성공" });
  }
  catch (err) {
    console.error(err);
  }
};

async function checkId(req, res) {
  const { id } = req.body;

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
  const { phone_number} = req.body;
  try {

    randomSixDigitNumber = generateRandomSixDigitNumber();
    const params = {
      to: phone_number,
      from: process.env.SMS_FROM,
      type: 'SMS',
      text: `[NurVo]인증번호는 ${randomSixDigitNumber} 입니다.`,
    };

    const response = await messageService.sendOne(params);
    res.send({ "Message": "발송되었습니다", "Number" : randomSixDigitNumber });

  }
  catch (err) {
    console.error(err);
  }
}
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from '../services/auth.mjs';
import { getUser, updateUser } from '../db/db.mjs';
import { stringDate } from '../services/attendance.mjs';

dotenv.config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;

export const router = express.Router();
router.post("/login", login);
router.get("/mypage", passport.authenticate("jwt", { session: false }), mypage);
router.post("/mypage", passport.authenticate("jwt", { session: false }), updateUserInfo);

async function login(req, res, next) {
  try{
    passport.authenticate("local", (err, user, info) => {
      if (err || !user) { // 에러나 user정보 없을때
        console.log(info)
        return next(err);
      }
      if (info) { // 에러 발생 시 이유
        return res.status(410).send(info.reason);
      }
      return req.login(user, { session: false }, (loginErr) => {  
        if (loginErr) {
          return next(loginErr);
        }
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            phone_number: user.phone_number, 
            nickname: user.nickname,
          },
          ACCESS_SECRET,
        );
        return res.json({ token: token });
      });
    })(req, res, next);
  }
  catch(err) {
    console.error(err);
  }
}

async function mypage(req, res){
  try{
    const id = req.user.id;
    const userInfo = await getUser(id);
    delete userInfo.password;
    if(userInfo.obj_date !== ''){
      const formattedDate = stringDate(userInfo.obj_date);

      const responseData = {
        id : userInfo.id,
        name : userInfo.name,
        nickname : userInfo.nickname,
        obj : userInfo.obj,
        obj_date : formattedDate,
        phone_number: userInfo.phone_number
      }

      res.status(200).send(responseData);
    } else {
      res.status(200).send(userInfo);
    }
  }
  catch(err){
    console.error(err);
  }
}

async function updateUserInfo(req, res){
  try{
    const id = req.user.id;
    const {obj, obj_date} = req.body;
    const updateData = {id, obj, obj_date};
    const result = await updateUser(updateData);
    delete result.password;
    const formattedDate = stringDate(result.obj_date);

    const responseData = {
      id : result.id,
      name : result.name,
      nickname : result.nickname,
      phone_number: result.phone_number,
      obj : result.obj,
      obj_date : formattedDate
    }

    res.status(200).send(responseData);
  }
  catch(err){
    console.error(err);
  }
}
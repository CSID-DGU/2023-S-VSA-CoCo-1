import passport from "passport";
import jwtPass from "passport-jwt";
import localPass from "passport-local";
import { getUser } from '../db/db.mjs';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;

// jwt 인증
passport.use(
  "jwt",
  new jwtPass.Strategy(
    {
      jwtFromRequest:jwtPass.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:ACCESS_SECRET,
    },
    (jwt_payload, done)=> {
      done(null, {
        id: jwt_payload.id,   
        name:jwt_payload.name, 
        phone_number:jwt_payload.phone_number, 
        nickname:jwt_payload.nickname,
      });
    }
  )
);

// 처음 로그인 할 때 사용되는 함수
passport.use(
  "local",
  new localPass.Strategy(
    { usernameField: "userId", passwordField: "password" }, // "userId":"id", "password":"password" 형태로 받음
    async (id, password, done) => {
      try{
        const user = await getUser(id); // id와 일치하는 user 찾음
        if(user){
          const passwordMatch = await bcrypt.compare(password, user.password);  // 비밀번호 hashing하여 비교 (결과값: true, false)
          if(passwordMatch){  // 비밀번호 일치하는 경우
            return done(null, user);
          }
            return done(null, false, { message: "Invalid username or password" }); // 비밀번호 일치하지 않는 경우

        } // user정보 없을경우
        return done(null, false, { message: "Invalid username or password" }); // false:로그인 실패
      }
      catch(err){
        console.error(err);
      }
    }

  )
);

export default passport;

import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import redis from './redisClient';

const helpers = {
  generateJWT: (user) => {
    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const signature = process.env.JWT_SECRET;

    return jwt.sign({ data }, signature, { expiresIn: process.env.JWT_EXPIRE });
  },
  setRefresh: (user, remember) => {
    const rToken = uuidv4();
    let time = 3 * 60 * 60;
    if (remember) {
      time = time * 8 * 30;
    }
    redis.setex(rToken, time, user.id);
    return { token: rToken, time };
  },
};

export default helpers;

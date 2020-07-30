import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import models from '../models';

function generateJWT(user) {
  const data = {
    uuid: user.uuid,
    username: user.username,
    email: user.email,
  };

  const signature = process.env.JWT_SECRET;
  const expiration = '6h';

  return jwt.sign({ data }, signature, { expiresIn: expiration });
}

const authService = {
  register: async (email, password, username) => {
    const hashed = await argon2.hash(password);
    const userRecord = await models.User.create({
      username,
      email,
      password: hashed,
      role: 0,
    });

    return {
      user: {
        email: userRecord.email,
        username: userRecord.username,
      },
      token: generateJWT(userRecord),
    };
  },

  login: async (username, password) => {
    const userRecord = await models.User.findByLogin(username);
    if (!userRecord) {
      throw new Error('User not found');
    } else {
      const correctPass = await argon2.verify(userRecord.password, password);
      if (!correctPass) {
        throw new Error('Incorrect Password');
      }
    }

    return {
      user: {
        email: userRecord.email,
        username: userRecord.username,
      },
      token: generateJWT(userRecord),
    };
  },
};

export default authService;

import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import models from '../models';
import mailService from './mailService';
import validator from 'validator';
import sessionHelpers from '../helpers/sessionHelpers';
import sessionService from './sessionService';

const authService = {
  generateToken: (user) => {
    return sessionHelpers.generateJWT(user);
  },
  register: async (email, password, username) => {
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email');
    }
    const hashed = await argon2.hash(password);
    const userRecord = await models.User.create({
      username,
      email,
      password: hashed,
      role: -1,
    });
    try {
      mailService.sendRegEmail(sessionHelpers.generateJWT(userRecord, true));
    } catch (error) {
      throw new Error('Something went wrong. Please try again');
    }
    return {
      user: {
        email: userRecord.email,
        username: userRecord.username,
      },
    };
  },

  verify: async (token) => {
    const signature = process.env.JWT_SECRET;
    let email;
    jwt.verify(token, signature, function (err, decoded) {
      if (err) {
        throw err;
      }
      email = decoded.data.email;
    });

    const user = await models.User.findOne({ where: { email } });
    if (user.role !== -1) {
      throw new Error('User already verified');
    }
    const updated = await user.update({ role: 0 });

    return {
      user: {
        email: updated.email,
        username: updated.username,
      },
      token: sessionHelpers.generateJWT(updated),
    };
  },

  forgot: async (username) => {
    const userRecord = await models.User.findByLogin(username);
    if (userRecord) {
      mailService.sendResetEmail(sessionHelpers.generateJWT(userRecord));
    }
    return {
      username,
    };
  },

  reset: async (token, password) => {
    const signature = process.env.JWT_SECRET;
    let email;
    jwt.verify(token, signature, function (err, decoded) {
      if (err) {
        throw err;
      }
      email = decoded.data.email;
    });

    const user = await models.User.findOne({ where: { email } });
    const hashed = await argon2.hash(password);
    const updated = await user.update({ password: hashed });

    return {
      user: {
        email: updated.email,
        username: updated.username,
      },
      token: sessionHelpers.generateJWT(updated),
    };
  },

  login: async (username, password, remember) => {
    const userRecord = await models.User.findByLogin(username);
    if (!userRecord) {
      throw new Error('User not found');
    } else if (userRecord.role === -1) {
      throw new Error('You must verify your account before logging in.');
    } else {
      const correctPass = await argon2.verify(userRecord.password, password);
      if (!correctPass) {
        throw new Error('Incorrect Password');
      }
    }

    return {
      response: {
        user: {
          email: userRecord.email,
          username: userRecord.username,
        },
        token: sessionHelpers.generateJWT(userRecord),
      },
      refresh: sessionService.newRefresh(userRecord, remember),
    };
  },
};

export default authService;

import { Router } from 'express';
import authService from '../services/authService';
import models from '../models';
import userService from '../services/userService';

const router = Router();

router.post('/impersonate', async (req, res) => {
  const userUsername = req.body.username;

  const userRecord = await models.User.findByLogin(userUsername);

  if (!userRecord) {
    return res.status(404).send('User not found');
  }

  return res.json({
    user: {
      email: userRecord.email,
      username: userRecord.username,
    },
    jwt: authService.generateToken(userRecord),
  });
});

router.post('/user', async (req, res) => {
  let users;
  try {
    users = await userService.getUsers(
      req.body.page,
      req.body.usersPer,
      req.body.filters,
      req.body.search
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
  console.log(users);
  return res.send(users);
});

export default router;

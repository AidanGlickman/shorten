import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import attachUser from '../middlewares/attachUser';
import roleCheck from '../middlewares/roleCheck';
import AuthService from '../services/AuthService';
import models from '../models';

const router = Router();

router.post('/register', async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const response = await AuthService.register(email, password, username);
  return res.send(response);
});

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let response;
  try {
    response = await AuthService.login(username, password);
  } catch (error) {
    console;
    return res.status(401).send(error.message);
  } finally {
    return res.send(response);
  }
});

export default router;

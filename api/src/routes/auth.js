import { Router } from 'express';
import Sequelize from 'sequelize';
import authService from '../services/authService';
import validPassword from '../helpers/validPassword';

const router = Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;
  const { username } = req.body;
  const { password } = req.body;
  if (!validPassword(password)) { return res.status(422).send('Invalid password.'); }
  let response;
  try {
    response = await authService.register(email, password, username);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      return res.status(401).send(error.errors[0].message);
    }
    return res.status(401).send(error.message);
  }
  return res.send(response);
});

router.post('/verify', async (req, res) => {
  const { token } = req.body;

  let response;
  try {
    response = await authService.verify(token);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      return res.status(401).send(error.errors[0].message);
    }
    return res.status(401).send(error.message);
  }

  return res.send(response);
});

router.post('/forgot', async (req, res) => {
  const { username } = req.body;
  let response;
  try {
    response = await authService.forgot(username);
  } catch (error) {
    res.status(401).send(error.message);
  }
  res.send(response);
});

router.post('/reset', async (req, res) => {
  const { password } = req.body;
  const { token } = req.body;
  let response;
  try {
    response = await authService.reset(token, password);
  } catch (error) {
    res.status(401).send(error.message);
  }
  res.send(response);
});

router.post('/login', async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const { remember } = req.body;
  let response;
  try {
    response = await authService.login(username, password, remember);
    res.cookie('refresh', response.refresh.token, {
      httpOnly: true,
      maxAge: response.refresh.time * 1000,
      signed: true,
    });
  } catch (error) {
    return res.status(401).send(error.message);
  }
  return res.send(response.response);
});

export default router;

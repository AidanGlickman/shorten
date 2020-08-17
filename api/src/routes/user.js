import { Router } from 'express';
import userService from '../services/userService';

const router = Router();

router.get('/workspaces', async (req, res) => {
  try {
    return res.send(
      await userService.getUserWorkspaces(req.currentUser.username)
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.delete('/', async (req, res) => {
  try {
    return res.send(await userService.deleteUser(req.currentUser.id));
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  const newInfo = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    return res.send(await userService.changeUserInfo(req.currentUser, newInfo));
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export default router;

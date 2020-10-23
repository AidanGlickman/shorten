import { Router } from 'express';
import userService from '../services/userService';
import workspaceService from '../services/workspaceService';
import models from '../models';

const router = Router();

router.get('/workspaces', async (req, res) => {
  try {
    return res.send(
      await userService.getUserWorkspaces(req.currentUser.username),
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.get('/workspaces/:code', async (req, res) => {
  const workspace = await workspaceService.getWorkspace(req.params.code);
  if (workspace == null) {
    return res.status(404).send('no workspace matching that code');
  }
  if (workspace.userId !== req.currentUser.id) {
    return res.status(401).send('User does not own this workspace.');
  }
  const links = await models.Link.findAll({
    where: {
      workspaceId: workspace.id,
    },
  });
  return res.send({
    workspace,
    links,
  });
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

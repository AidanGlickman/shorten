import { Router } from 'express';
import middlewares from '../middlewares';
import workspaceService from '../services/workspaceService';
import analyticsService from '../services/analyticsService';
import models from '../models';

const router = Router();

router.post(
  '/create',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  async (req, res) => {
    const workspaceInfo = {
      code: req.body.code,
      title: req.body.title,
      description: req.body.description,
      private: req.body.private,
      password: req.body.password,
    };
    let result;
    try {
      result = await workspaceService.createWorkspace(
        req.currentUser,
        workspaceInfo,
      );
      return res.send(result);
    } catch (error) {
      return res.status(401).send(error.message);
    }
  },
);

router.get('/:code', async (req, res) => {
  const workspace = await workspaceService.getWorkspace(req.params.code);
  if (workspace == null) {
    return res.status(404).send('no workspace matching that code');
  }
  if (workspace.private) {
    return res.send({
      workspace: { code: workspace.code },
      private: true,
    });
  }

  const links = await models.Link.findAll({
    where: {
      workspaceId: workspace.id,
    },
  });

  try {
    analyticsService.attachAnalytic(req, 'workspace', workspace.id);
  } catch (error) {
    // analytic failed, just ignore it
  }

  return res.send({
    workspace: {
      code: workspace.code,
      title: workspace.title,
      description: workspace.description,
      links,
    },
    private: false,
  });
});

router.post('/private/:code', async (req, res) => {
  const workspace = await workspaceService.getWorkspace(req.params.code);
  if (workspace == null) {
    return res.status(404).send('no workspace matching that code');
  }

  const links = await models.Link.findAll({
    where: {
      workspaceId: workspace.id,
    },
  });

  if (!workspace.private) {
    return res.send({
      workspace: {
        code: workspace.code,
        title: workspace.title,
        description: workspace.description,
        links,
      },
    });
  }

  const correctPass = workspace.password === req.body.password;

  if (!correctPass) {
    return res.status(401).send('incorrect password for this workspace');
  }

  try {
    analyticsService.attachAnalytic(req, 'workspace', workspace.id);
  } catch (error) {
    // analytic failed, just ignore it
  }

  return res.send({
    workspace: {
      code: workspace.code,
      title: workspace.title,
      description: workspace.description,
      links,
    },
  });
});

router.delete(
  '/:code',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  async (req, res) => {
    let result;
    try {
      const workspace = await workspaceService.getWorkspace(req.params.code);
      if (workspace.userId === req.currentUser.id) {
        result = workspaceService.deleteWorkspace(req.params.code);
      }
    } catch (error) {
      return res.status(400).send('something went wrong. please try again');
    }
    return res.send(result);
  },
);

router.post(
  '/:code',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  async (req, res) => {
    const workspace = await workspaceService.getWorkspace(req.params.code);
    let result;
    try {
      if (workspace.userId === req.currentUser.id) {
        const newWorkspaceInfo = {
          code: req.body.code,
          title: req.body.title,
          description: req.body.description,
          private: req.body.private,
          password: req.body.password,
        };
        result = await workspaceService.editWorkspace(
          workspace.code,
          newWorkspaceInfo,
        );
      }
    } catch (error) {
      return res.status(401).send(error.message);
    }
    return res.send(result);
  },
);

export default router;

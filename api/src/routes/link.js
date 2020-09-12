import { Router } from 'express';
import middlewares from '../middlewares';
import roleCheck from '../middlewares/roleCheck';
import workspaceService from '../services/workspaceService';
import linkService from '../services/linkService';
import analyticsService from '../services/analyticsService';

const router = Router({ mergeParams: true });

router.post(
  '/create',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  async (req, res) => {
    console.log(req.params);
    const workspace = await workspaceService.getWorkspace(
      req.params.workspaceCode
    );
    if (workspace.userId !== req.currentUser.id) {
      return res.status(401).send('user does not own workspace');
    }
    const linkInfo = {
      code: req.body.code,
      link: req.body.link,
      name: req.body.name,
      icon: req.body.icon,
    };

    let result;
    try {
      result = await linkService.createLink(workspace.code, linkInfo);
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.send(result);
  }
);

router.post('/:code', async (req, res) => {
  let result;
  try {
    result = await linkService.getLink(
      req.params.workspaceCode,
      req.params.code
    );
    if (req.body.analytic) {
      try {
        analyticsService.attachAnalytic(req, 'link', result.id);
      } catch (error) {}
    }
  } catch (error) {
    return res.status(400).send(error);
  }
  res.send(result);
});

router.post(
  '/:code',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  async (req, res) => {
    const workspace = await workspaceService.getWorkspace(
      req.params.workspaceCode
    );
    if (workspace.userId !== req.currentUser.id) {
      return res.status(401).send('user does not own workspace');
    }
    const newLinkInfo = {
      code: req.body.code,
      link: req.body.link,
      name: req.body.name,
      icon: req.body.icon,
    };
    let result;
    try {
      result = await linkService.editLink(
        workspace.code,
        req.params.code,
        newLinkInfo
      );
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.send(result);
  }
);

router.delete(
  '/:code',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  async (req, res) => {
    const workspace = await workspaceService.getWorkspace(
      req.params.workspaceCode
    );
    if (workspace.userId !== req.currentUser.id) {
      return res.status(401).send('user does not own workspace');
    }
    let result;
    try {
      result = linkService.deleteLink(
        req.params.workspaceCode,
        req.params.code
      );
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.send(result);
  }
);

export default router;

import { Router } from 'express';
import middlewares from '../middlewares';
import workspaceService from '../services/workspaceService';
import linkService from '../services/linkService';
// import analyticsService from '../services/analyticsService';
import validUrl from '../helpers/validUrl';

const router = Router({ mergeParams: true });

router.post(
  '/create',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  async (req, res) => {
    const workspace = await workspaceService.getWorkspace(
      req.params.workspaceCode,
    );
    if (workspace.userId !== req.currentUser.id) {
      return res.status(401).send('user does not own workspace');
    }
    const linkInfo = {
      code: req.body.code,
      link: req.body.link,
      name: req.body.name,
      icon: req.body.icon || 'link',
    };

    if (!validUrl(linkInfo.link)) {
      return res.status(422).send('invalid url format');
    }

    let result;
    try {
      result = await linkService.createLink(workspace.code, linkInfo);
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.send(result);
  },
);

router.get('/:code', async (req, res) => {
  let result;
  try {
    result = await linkService.getLink(
      req.params.workspaceCode,
      req.params.code,
    );
    // try {
    //   analyticsService.attachAnalytic(req, 'link', result.id);
    // } catch (error) {
    //   // analytic failed, just ignore it
    // }
  } catch (error) {
    return res.status(400).send(error);
  }
  return res.send(result);
});

router.post(
  '/:code',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  async (req, res) => {
    const workspace = await workspaceService.getWorkspace(
      req.params.workspaceCode,
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

    if (!validUrl(newLinkInfo.link)) {
      return res.status(422).send('invalid url format');
    }

    let result;
    try {
      result = await linkService.editLink(
        workspace.code,
        req.params.code,
        newLinkInfo,
      );
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.send(result);
  },
);

router.delete(
  '/:code',
  middlewares.isAuth,
  middlewares.attachUser,
  middlewares.roleCheck(0),
  async (req, res) => {
    const workspace = await workspaceService.getWorkspace(
      req.params.workspaceCode,
    );
    if (workspace.userId !== req.currentUser.id) {
      return res.status(401).send('user does not own workspace');
    }
    let result;
    try {
      result = linkService.deleteLink(
        req.params.workspaceCode,
        req.params.code,
      );
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.send(result);
  },
);

export default router;

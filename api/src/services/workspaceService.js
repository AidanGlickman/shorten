import models from '../models';
import * as argon2 from 'argon2';

const workspaceService = {
  createWorkspace: async (user, workspaceInfo) => {
    const hashed = await argon2.hash(workspaceInfo.password);
    const workspace = await models.Workspace.create({
      userId: user.id,
      code: workspaceInfo.code,
      title: workspaceInfo.title,
      description: workspaceInfo.description,
      private: workspaceInfo.private,
      password: hashed,
    });

    return {
      workspace: {
        code: workspace.code,
      },
    };
  },
  getWorkspace: async (workspaceCode) => {
    return await models.Workspace.findOne({ where: { code: workspaceCode } });
  },
  deleteWorkspace: async (workspaceCode) => {
    return await models.Workspace.destroy({
      where: { code: workspaceCode },
    });
  },
  editWorkspace: async (workspaceCode, newWorkspaceInfo) => {
    const workspace = await models.Workspace.findOne({
      where: { code: workspaceCode },
    });
    return workspace.update({
      code: newWorkspaceInfo.code,
      title: newWorkspaceInfo.title,
      description: newWorkspaceInfo.description,
      private: newWorkspaceInfo.private,
      password: await argon2.hash(newWorkspaceInfo.password),
    });
  },
  doesWorkspaceExist: async (workspaceCode) => {
    const workspace = await models.Workspace.findOne({
      where: { code: workspaceCode },
    });
    console.log(workspace);
    return workspace !== null;
  },
};

export default workspaceService;

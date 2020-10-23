import models from '../models';

const workspaceService = {
  createWorkspace: async (user, workspaceInfo) => {
    const workspace = await models.Workspace.create({
      userId: user.id,
      code: workspaceInfo.code,
      title: workspaceInfo.title,
      description: workspaceInfo.description,
      private: workspaceInfo.private,
      password: workspaceInfo.password,
    });

    return {
      workspace: {
        code: workspace.code,
      },
    };
  },
  getWorkspace: async (code) => models.Workspace.findOne({ where: { code } }),
  deleteWorkspace: async (workspaceCode) => models.Workspace.destroy({
    where: { code: workspaceCode },
  }),
  editWorkspace: async (workspaceCode, newWorkspaceInfo) => {
    const workspace = await models.Workspace.findOne({
      where: { code: workspaceCode },
    });
    return workspace.update({
      code: newWorkspaceInfo.code,
      title: newWorkspaceInfo.title,
      description: newWorkspaceInfo.description,
      private: newWorkspaceInfo.private,
      password: newWorkspaceInfo.password,
    });
  },
  doesWorkspaceExist: async (workspaceCode) => {
    const workspace = await models.Workspace.findOne({
      where: { code: workspaceCode },
    });
    return workspace !== null;
  },
};

export default workspaceService;

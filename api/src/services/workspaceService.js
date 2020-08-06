import models from '../models';

const workspaceService = {
  createWorkspace: async (user, workspaceInfo) => {
    const hashed = await argon2.hash(workspaceInfo.password);
    return await models.Workspace.create({
      title: workspaceInfo.title,
      description: workspaceInfo.description,
      code: workspaceInfo.code,
      private: workspaceInfo.private,
      password: hashed,
      userId: user.id,
    });
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
    const workspace = await this.getWorkspace(workspaceCode);
    return workspace.update({
      code: newWorkspaceInfo.code,
    });
  },
};

export default workspaceService;

import models from '../models';
import workspaceService from './workspaceService';

const getLink = async (workspaceCode, linkCode) => {
  const workspace = await workspaceService.getWorkspace(workspaceCode);
  return models.Link.findOne({
    where: {
      workspaceId: workspace.id,
      code: linkCode,
    },
  });
};

const linkService = {
  createLink: async (workspaceCode, linkInfo) => {
    const workspace = await workspaceService.getWorkspace(workspaceCode);
    const link = await linkService.getLink(workspaceCode, linkInfo.code);
    if (link) {
      throw new Error('Link with this code in this workspace already exists.');
    }
    return models.Link.create({
      code: linkInfo.code,
      link: linkInfo.link,
      name: linkInfo.name,
      icon: linkInfo.icon,
      workspaceId: workspace.id,
    });
  },
  getLink: async (workspaceCode, linkCode) => getLink(workspaceCode, linkCode),
  editLink: async (workspaceCode, linkCode, newLinkInfo) => {
    const link = await getLink(workspaceCode, linkCode);
    const currLink = await getLink(workspaceCode, newLinkInfo.code);
    if (currLink) {
      throw new Error('Link with this code in this workspace already exists.');
    }
    return link.update({
      code: newLinkInfo.code,
      link: newLinkInfo.link,
      name: newLinkInfo.name,
      icon: newLinkInfo.icon,
    });
  },
  deleteLink: async (workspaceCode, linkCode) => {
    const workspace = await workspaceService.getWorkspace(workspaceCode);
    return models.Link.destroy({
      where: {
        code: linkCode,
        workspaceId: workspace.id,
      },
    });
  },
};

export default linkService;

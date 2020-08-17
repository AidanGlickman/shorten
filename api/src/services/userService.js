import models from '../models';
import * as argon2 from 'argon2';
import { Op } from 'sequelize';

const userService = {
  getUsers: async (page, usersPer, filters, search) => {
    return await models.User.findAndCountAll({
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: '%' + search + '%' } },
          { email: { [Op.iLike]: '%' + search + '%' } },
        ],
        role: filters.roles,
      },
      offset: page * usersPer,
      limit: usersPer,
    });
  },
  getUserWorkspaces: async (username) => {
    const user = await models.User.findByLogin(username);
    const workspaces = await models.Workspace.findAll({
      where: { userId: user.id },
    });
    return workspaces;
  },
  deleteUser: async (userId) => {
    const result = await models.User.destroy({ where: { id: userId } });
    return result;
  },
  changeUserInfo: async (user, newInfo) => {
    return await user.update({
      email: newInfo.email,
      password: await argon2.hash(newInfo.password),
    });
  },
};

export default userService;

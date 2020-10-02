import * as argon2 from 'argon2';
import { Op } from 'sequelize';
import models from '../models';

const userService = {
  getUsers: async (page, usersPer, filters, search) => models.User.findAndCountAll({
    where: {
      [Op.or]: [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ],
      role: filters.roles,
    },
    offset: page * usersPer,
    limit: usersPer,
  }),
  getUserWorkspaces: async (username) => {
    const user = await models.User.findByLogin(username);
    return models.Workspace.findAll({
      where: { userId: user.id },
    });
  },
  deleteUser: async (userId) => models.User.destroy({ where: { id: userId } }),
  changeUserInfo: async (user, newInfo) => user.update({
    email: newInfo.email,
    password: await argon2.hash(newInfo.password),
  }),
};

export default userService;

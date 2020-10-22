import randomstring from 'randomstring';
import models from '../models';

const registerWorkspace = async (user) => {
  try {
    const workspace = await models.Workspace.create({
      userId: user.id,
      code: randomstring.generate({
        length: 5,
        charset: 'alphabetic',
        capitalization: 'lowercase',
      }),
      title: `${user.username}'s workspace`,
      description: '',
      private: false,
    });
    return workspace;
  } catch {
    registerWorkspace(user);
    return false;
  }
};

export default registerWorkspace;
